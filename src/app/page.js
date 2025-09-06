import Card from "@/components/ui/card";
import SubscribeForm from "@/features/newsletter/SubscribeForm";
import Button from "@/shared/ui/Button";
import Heading from "@/shared/ui/Heading";


export default function Home() {
  return (
    <>

      <section className="space-y-6">
        <Heading level={1}>Welcome to My Blog</Heading>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This is a modern, scalable Next.js blog rebuilt from scratch.
        </p>

        <Card>
          <Heading level={2}>Try Buttons</Heading>
          <div className="flex gap-4 mt-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </Card>

      </section>


      <section className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome to my Blog 🚀</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sharing insights on web development, projects, and more.
        </p>

        {/* Newsletter CTA */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold">Stay Updated</h2>
          <SubscribeForm />
        </div>
      </section>
    </>
  );
}
