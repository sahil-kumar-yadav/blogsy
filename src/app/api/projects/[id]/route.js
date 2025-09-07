import { NextResponse } from "next/server"
import { getProject, updateProject, deleteProject } from "@/features/projects/service"

export async function GET(req, { params }) {
    try {
        const project = await getProject(params.id)
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const body = await req.json()
        const { name, slug, description, link } = body
        const updated = await updateProject(params.id, { name, slug, description, link })
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await deleteProject(params.id)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
