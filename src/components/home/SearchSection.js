import Heading from "@/components/shared/Heading"
import Card from "@/components/shared/Card"
import SearchBar from "@/features/search/SearchBar"

export default function SearchSection() {
    return (
        <section>
            <Card className="p-6">
                <Heading level={2} className="mb-4">
                    Search
                </Heading>
                <SearchBar />
            </Card>
        </section>
    )
}
