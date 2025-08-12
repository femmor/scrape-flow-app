import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/" className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                </div>
            </div>

            <footer className="text-sm text-muted-foreground mt-12">
                If you think this is an error, please contact our support team.
            </footer>
        </div>
    )
}

export default NotFoundPage