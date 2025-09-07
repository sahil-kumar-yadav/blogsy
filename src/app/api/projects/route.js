import { NextResponse } from "next/server"
import { getProjects, createProject } from "@/features/projects/service"

export async function GET() {
    try {
        const projects = await getProjects()
        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { name, slug, description, link } = body

        if (!name || !slug) {
            return NextResponse.json(
                { error: "Name and slug are required" },
                { status: 400 }
            )
        }

        const project = await createProject({ name, slug, description, link })
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
