import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { ChevronRight, ExternalLink } from "lucide-react";
import ButtonNav from "../components/ButtonNav";

interface Project {
  artist: string;
  bio: string;
  members: string[];
  spotify: string;
  homepageUrl: string;
  imgFileName: string;
  imageUrl: string;
}

function ProjectDetails() {
  const { artist } = useParams<{ artist: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Projects"));
        const projectsData: Project[] = querySnapshot.docs.map(
          (doc) => doc.data() as Project
        );

        const storage = getStorage();

        const selectedProject = projectsData.find(
          (project) => project.artist === artist
        );

        if (selectedProject) {
          const imageRef = ref(
            storage,
            `Projects/${selectedProject.imgFileName}`
          );
          const imageUrl = await getDownloadURL(imageRef);
          setProject({ ...selectedProject, imageUrl });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [artist]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.artist}</h1>
      <div className="grid gap-4">
        <img src={project.imageUrl} alt={project.artist} />
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

        {project.spotify && (
          <div>
            <ul>
              <iframe
                src={project.spotify}
                className="album"
                width="100%"
                height="380"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </ul>
          </div>
        )}

        {project.homepageUrl && (
          <div>
            <a
              target="_blank"
              className="flex underline gap-1"
              href={project.homepageUrl}
            >
              <p>{project.artist}</p>
              <ExternalLink className="inline-block pt-1" />
            </a>
          </div>
        )}
        <ButtonNav to="/projects" title="All projects" />
      </div>
    </div>
  );
}

export default ProjectDetails;
