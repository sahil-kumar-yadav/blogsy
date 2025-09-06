import Heading from "../../shared/ui/Heading"
import SearchBox from "../../features/search/SearchBox"

export const metadata = {
  title: "Search",
}

export default function SearchPage() {
  return (
    <section className="space-y-6">
      <Heading level={1}>Search</Heading>
      <SearchBox />
    </section>
  )
}
