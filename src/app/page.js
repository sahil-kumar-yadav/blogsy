import Card from "@/components/ui/card";
import Button from "@/shared/ui/Button";
import Heading from "@/shared/ui/Heading";


export default function Home() {
  return (
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
  );
}
