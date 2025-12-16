import { mutators } from '@repo/zero/mutators';
import { queries } from '@repo/zero/queries';
import { useQuery, useZero } from '@repo/zero/react';
import { createFileRoute } from '@tanstack/react-router';
import { v7 } from 'uuid';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const [projects, projectsQuery] = useQuery(
    queries.projects.list({ limit: 1000 }),
  );
  const zero = useZero();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    zero.mutate(
      mutators.projects.create({
        id: v7(),
        name,
        description,
      }),
    );
  };
  return (
    <div className="text-center p-5">
      <form onSubmit={onSubmit} className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          required
          className="bg-gray-200 p-2"
          maxLength={255}
        />
        <textarea
          name="description"
          placeholder="Project Description"
          className="bg-gray-200 p-2"
          maxLength={1024}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
      <div className="flex gap-1 flex-wrap">
        {projects?.map((project) => (
          <div key={project.id} className="border p-2">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <span>{new Date(project.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
