import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { ExternalLink } from "lucide-react";

interface Project {
  artist: string;
  bio: string;
  albums: string[];
  members: string[];
  homepageUrl: string;
  imgFileName: string;
  imageUrl: string;
  leader: boolean;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>(
    {}
  );
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch project data from Firestore
        const querySnapshot = await getDocs(collection(db, "Projects"));
        const projectsData: Project[] = querySnapshot.docs.map(
          (doc) => doc.data() as Project
        );

        // Fetch image URLs for each project from Firebase Storage
        const storage = getStorage();
        const projectsWithImages = await Promise.all(
          projectsData.map(async (project) => {
            const imageRef = ref(storage, `Projects/${project.imgFileName}`);
            const imageUrl = await getDownloadURL(imageRef);
            return { ...project, imageUrl };
          })
        );

        // Sort projects based on the 'leader' property
        const sortedProjects = projectsWithImages.sort((a, b) => {
          // Put projects with 'leader' set to true first
          return a.leader === b.leader ? 0 : a.leader ? -1 : 1;
        });

        // Set the projects state with sorted and image URLs
        setProjects(sortedProjects);

        // Initialize showDetails state for each project
        const initialShowDetails: { [key: string]: boolean } = {};
        sortedProjects.forEach((project) => {
          initialShowDetails[project.artist] = false;
        });
        setShowDetails(initialShowDetails);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Call the function to fetch project data
    fetchProjects();
  }, []);

  const handleToggleDetails = (artist: string) => {
    setShowDetails((prevDetails) => {
      // Create a copy of the previous state
      const newDetails = { ...prevDetails };

      // Close details for all projects
      Object.keys(newDetails).forEach((key) => {
        newDetails[key] = false;
      });

      // Open details for the clicked project
      newDetails[artist] = !prevDetails[artist];

      // Move the selected project to the beginning of the projects array
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
        const selectedProjectIndex = updatedProjects.findIndex(
          (project) => project.artist === artist
        );

        if (selectedProjectIndex !== -1 && window.innerWidth > 640) {
          const selectedProject = updatedProjects.splice(
            selectedProjectIndex,
            1
          )[0];
          updatedProjects.unshift(selectedProject);
        }

        return updatedProjects;
      });

      // Scroll to the top of the page on large screens
      if (window.innerWidth > 640) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      return newDetails;
    });
  };

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2 pt-4 md:pt-8 mx-auto lg:w-4/5 2xl:w-3/4">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`hover:text-primary transition-all ease-in-out mt-2 mx-auto ${
              showDetails[project.artist] ? "sm:col-span-2" : ""
            }`}
          >
            <h2 className="text-center">{project.artist}</h2>
            <img
              className="hover:shadow-2xl transition-all ease-in-out cursor-pointer"
              src={project.imageUrl}
              alt={`Project ${index + 1}`}
              onClick={() => handleToggleDetails(project.artist)}
            />

            {/* Show details */}
            {showDetails[project.artist] && (
              <div className="grid gap-4 py-2 text-black">
                <p>{project.bio}</p>
                {project.members && (
                  <div>
                    <h3>Members</h3>
                    <ul>
                      {project.members.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* {project.albums && (
                  <div>
                    <h3>Music</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.albums.map((album, index) => (
                        <iframe
                          key={index}
                          src={album}
                          width="100%"
                          height="352"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        ></iframe>
                      ))}
                    </div>
                  </div>
                )} */}

                {project.homepageUrl && (
                  <a
                    target="_blank"
                    className="flex underline gap-1"
                    href={project.homepageUrl}
                  >
                    <p>Read more about {project.artist}</p>
                    <ExternalLink className="inline-block pt-1" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
