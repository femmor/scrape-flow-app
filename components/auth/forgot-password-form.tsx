"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { forgotPasswordValidator } from "@/lib/validators/forgotPasswordValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { useState } from "react"
import { requestPasswordReset } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { Loader2 } from "lucide-react"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof forgotPasswordValidator>>({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordValidator>) {
    setIsLoading(true)

    try {
      const result = await requestPasswordReset({
        email: values.email
      });

      if (result.error) {
        toast.error(result.error.message || "Password reset request failed!")
      } else {
        toast.success("Password reset email sent! Please check your inbox and click the link to reset your password.")
        // Don't redirect immediately - let user check their email
        form.reset()
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription className="text-sm">
            Enter your email address below and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                    {isLoading ? "Sending..." : "Get Password Reset Link"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
