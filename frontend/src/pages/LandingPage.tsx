import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

//this is from v0.app

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Take Control of Your Finances
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Track, analyze, and optimize your spending with my simple
                finance tracker. Start your journey to financial freedom today.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/login">
                <Button size="lg">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
