import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import SmoothRender from "../components/SmoothRender";

interface Project {
  artist: string;
  imgFileName: string;
  imageUrl: string;
  order: number;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Projects"));
        const projectsData: Project[] = querySnapshot.docs.map(
          (doc) => doc.data() as Project
        );

        const storage = getStorage();
        const getImageUrls = projectsData.map(async (project) => {
          const imageRef = ref(storage, `Projects/${project.imgFileName}`);
          const imageUrl = await getDownloadURL(imageRef);
          return { ...project, imageUrl };
        });

        const projectsWithImages = await Promise.all(getImageUrls);

        // Sort projects by order
        projectsWithImages.sort((a, b) => a.order - b.order);

        setProjects(projectsWithImages);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mainContent">
      <h1>Projects</h1>
      {projects.length === 0 && <Spinner />}

      <div className="grid gap-4 sm:grid-cols-2 pt-4 md:pt-8 mx-auto lg:w-4/5 2xl:w-3/4">
        {projects.map((project, index) => (
          <SmoothRender key={index} index={index} delay={200}>
            <Link to={`/projects/${project.artist}`}>
              <div
                key={index}
                className="sm:hover:text-primary transition-all ease-in-out mt-2 mx-auto"
              >
                <h2 className="text-center">{project.artist}</h2>
                <img
                  className="hover:shadow-2xl transition-all ease-in-out cursor-pointer"
                  src={project.imageUrl}
                  alt={`Project ${index + 1}`}
                  loading="lazy"
                />
              </div>
            </Link>
          </SmoothRender>
        ))}
      </div>
    </div>
  );
}

export default Projects;
