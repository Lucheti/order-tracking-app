import { useRouter, BlitzPage, Routes } from "blitz"
import EmptyLayout from "app/core/layouts/EmptyLayout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <EmptyLayout title="Sign Up">{page}</EmptyLayout>

export default SignupPage
