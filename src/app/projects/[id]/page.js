import { getProjectById } from "@/features/projects/service";
import ButtonComponent from "@/shared/ui/Button";

export default async function ProjectDetail({ params: rawParams }) {
    const params = await rawParams;
    const project = await getProjectById(params.id);

    if (!project) {
        return (
            <section className="py-20 text-center text-gray-400">
                <p className="text-xl italic">Project not found.</p>
            </section>
        );
    }

    return (
        <section className="relative px-8 py-20 max-w-5xl mx-auto space-y-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] text-white">
            {/* Decorative glow accents */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-400/30 rounded-full blur-2xl"></div>

            {/* Project Title */}
            <h1 className="text-5xl font-extrabold tracking-tight text-indigo-300 drop-shadow-md text-center">
                {project.name}
            </h1>

            {/* Project Description */}
            <p className="text-lg leading-relaxed text-gray-300 text-center max-w-3xl mx-auto">
                {project.description}
            </p>

            {/* Project Link */}
            {(project.url || true) && (
                <div className="text-center">
                    <ButtonComponent variant="secondary">
                        🚀 Visit Project
                    </ButtonComponent>
                </div>
            )}
        </section>
    );
}
