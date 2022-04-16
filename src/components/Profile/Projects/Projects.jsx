import Project from '../Project/Project';

export default function Projects({ projects }) {
  return (
    <div>
      {projects.map((project) => (
        <Project key={project.title} project={project} />
      ))}
    </div>
  );
}
