import type React from "react";
import { BookOpen, Mic, Users, MessageSquare, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalegAvatar } from "@/components/galeg-avatar";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>DigiKyeVerse</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="container flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Avatar className="h-10 w-10 border-2 border-amber-300">
                  <AvatarImage src="/logo.png" alt="App Logo" />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-lg font-bold">
                    DKV
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-900">
                  DigiཀྱེVerse
                </h1>
                <p className="text-xs text-amber-600 -mt-1">
                  Learning | Engagement
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container px-4 py-6">
          {/* Welcome Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-amber-900">
                <p>Welcome</p>
                <p>བཀྲ་ཤིས་བདེ་ལེགས།</p>
              </h2>
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="bg-amber-500 text-white">
                  TS
                </AvatarFallback>
              </Avatar>
            </div>
            <Card className="bg-gradient-to-r from-[#722F37] to-[#9E3A43] border-none text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E3B53B] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E3B53B] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-center gap-4">
                  <GalegAvatar size="md" className="border-2 border-white" />
                  <div>
                    <h3 className="text-xl font-bold">Meet Galeg</h3>
                    <p className="text-white/80">Your Tibetan AI guide</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-white text-[#722F37] hover:bg-amber-100 border-[#E3B53B] border">
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-amber-900">
              Continue Learning
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-amber-500" />}
                title="Daily Lessons"
                description="Continue your language journey"
                progress={65}
              />
              <FeatureCard
                icon={<Mic className="h-8 w-8 text-amber-500" />}
                title="Stories"
                description="Listen to cultural tales"
                progress={30}
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-amber-500" />}
                title="Family Space"
                description="Connect with relatives"
                progress={50}
              />
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-amber-500" />}
                title="Practice"
                description="Interactive conversations"
                progress={40}
              />
            </div>
          </section>

          {/* Community Stories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-amber-900">
                Community Stories
              </h2>
              <Button variant="link" className="text-amber-600">
                See All
              </Button>
            </div>
            <div className="space-y-4">
              <StoryCard
                avatar="/placeholder.svg?height=40&width=40"
                name="Tenzin"
                role="Grandmother"
                title="The Kind Yak"
                preview="A story about kindness and compassion in the mountains..."
              />
              <StoryCard
                avatar="/placeholder.svg?height=40&width=40"
                name="Dorje"
                role="Teacher"
                title="Moon Festival"
                preview="Learn about the traditions of the Tibetan Moon Festival..."
              />
            </div>
          </section>
        </main>

        {/* Navigation */}
        <nav className="sticky bottom-0 border-t bg-white shadow-sm">
          <div className="container flex items-center justify-around h-16">
            <NavButton
              icon={<BookOpen className="h-5 w-5" />}
              label="Learn"
              active
            />
            <NavButton icon={<Mic className="h-5 w-5" />} label="Stories" />
            <NavButton icon={<Users className="h-5 w-5" />} label="Family" />
            <NavButton
              icon={<MessageSquare className="h-5 w-5" />}
              label="Galeg"
            />
          </div>
        </nav>
      </div>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  progress,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: number;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        {icon}
        <CardTitle className="text-base mt-2">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <div className="w-full">
          <div className="h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-right mt-1 text-amber-700">{progress}%</p>
        </div>
      </CardFooter>
    </Card>
  );
}

function StoryCard({
  avatar,
  name,
  role,
  title,
  preview,
}: {
  avatar: string;
  name: string;
  role: string;
  title: string;
  preview: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-amber-500 text-white">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{preview}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          Listen
        </Button>
      </CardFooter>
    </Card>
  );
}

function NavButton({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col h-14 rounded-none ${
        active ? "text-amber-600" : "text-muted-foreground"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Button>
  );
}
