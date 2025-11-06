import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="ml-24 flex-1">
        {/* Home Section */}
        <section id="home" className="min-h-screen p-8 flex items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your beautiful sidebar is ready! Click the icons on the left to scroll to different sections.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">Feature {item}</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on the sidebar icons to scroll between different sections.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="min-h-screen p-8 flex items-center bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <p className="text-xl text-muted-foreground">Manage your profile settings here.</p>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="min-h-screen p-8 flex items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Team</h1>
            <p className="text-xl text-muted-foreground">Collaborate with your team members.</p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen p-8 flex items-center bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Education</h1>
            <p className="text-xl text-muted-foreground">Access learning resources and courses.</p>
          </div>
        </section>

        {/* Favorites Section */}
        <section id="favorites" className="min-h-screen p-8 flex items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Favorites</h1>
            <p className="text-xl text-muted-foreground">Your saved and favorite items.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
