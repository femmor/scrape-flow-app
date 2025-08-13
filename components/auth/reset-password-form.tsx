"use client"

import { cn } from "@/lib/utils"
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
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordValidator } from "@/lib/validators/resetPasswordValidator"
import { toast } from "sonner"
import { resetPassword } from "@/lib/auth-client"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasValidToken, setHasValidToken] = useState(true)
  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const error = searchParams.get("error")

  useEffect(() => {
    if (error === "INVALID_TOKEN" || !token) {
      setHasValidToken(false)
      if (error === "INVALID_TOKEN") {
        toast.error("Invalid or expired reset token. Please request a new password reset.")
      } else if (!token) {
        toast.error("No reset token found. Please check your email link.")
      }
    }
  }, [error, token])

  const form = useForm<z.infer<typeof resetPasswordValidator>>({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof resetPasswordValidator>) {
    if (!token) {
      toast.error("No reset token found")
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPassword({
        newPassword: values.newPassword,
        token,
      });

      if (result.error) {
        toast.error(result.error.message || "Password reset failed")
      } else {
        toast.success("Password reset successfully!")
        
        // Redirect to login after successful reset
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      }
    } catch (error) {
      console.error("Password reset error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasValidToken) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Invalid Reset Link</CardTitle>
            <CardDescription className="text-sm">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Please request a new password reset from the login page.
              </p>
              <Button onClick={() => router.push("/forgot-password")} className="w-full">
                Request New Reset Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription className="text-sm">
            Enter your new password below and confirm it in the next field.
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
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || !token}>
                    {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                    {isLoading ? "Resetting..." : "Reset Password"}
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
