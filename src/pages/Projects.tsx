import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { ExternalLink } from "lucide-react";

interface Project {
  artist: string;
  bio: string;
  albums: string[];
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

      return newDetails;
    });
  };

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid gap-8 md:grid-cols-2 pt-4 md:pt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="hover:text-primary transition-all ease-in-out"
          >
            <h2 className="text-center">{project.artist}</h2>
            <img
              className="hover:shadow-2xl transition-all ease-in-out cursor-pointer "
              src={project.imageUrl}
              alt={`Project ${index + 1}`}
              onClick={() => handleToggleDetails(project.artist)}
            />
            {showDetails[project.artist] && (
              <div className="py-2 text-black">
                <p>{project.bio}</p>
                {project.homepageUrl && (
                  <a
                    target="_blank"
                    className="flex underline gap-1"
                    href={project.homepageUrl}
                  >
                    <p>Read more</p>
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
