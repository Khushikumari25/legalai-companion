import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ArrowRight, Scale, Shield, Clock, MessageSquare, Star, CheckCircle } from "lucide-react";
import legalHero from "@/assets/legal-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Scale,
      title: "Expert Legal Knowledge",
      description: "Comprehensive understanding of Indian laws including IPC, CrPC, Constitution, and more.",
    },
    {
      icon: Shield,
      title: "Confidential & Secure",
      description: "Your conversations are encrypted and never shared. Your privacy is our priority.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Get instant legal guidance anytime, anywhere. No waiting for appointments.",
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Ask questions in plain language. No legal jargon required.",
    },
  ];

  const testimonials = [
    {
      name: "Advocate Priya Sharma",
      role: "High Court Lawyer",
      content: "LegalAI has become an invaluable tool for quick research and client consultations.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "Finally, I can understand my legal rights without expensive consultations every time.",
      rating: 5,
    },
    {
      name: "Dr. Meena Patel",
      role: "University Professor",
      content: "An excellent resource for teaching constitutional law concepts to students.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="gold">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src={legalHero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 animate-fade-in">
              <Scale className="h-4 w-4" />
              <span className="text-sm font-medium">India's Leading Legal AI Assistant</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Navigate Indian Law
              <br />
              <span className="text-gradient-gold">With Confidence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Get instant, accurate answers to your legal questions. From constitutional rights 
              to property laws, LegalAI is your trusted companion for understanding Indian law.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Login to Continue
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Legal Queries Answered</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Why Choose LegalAI?
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience the future of legal assistance with our AI-powered platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-2xl border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our users say about LegalAI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-2xl border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of users who trust LegalAI for their legal queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Create Free Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 text-primary-foreground/70 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-sidebar text-sidebar-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="light" />
            <p className="text-sm text-sidebar-foreground/70">
              © 2024 LegalAI. All rights reserved. This is not legal advice.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm hover:text-accent transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link to="/contact" className="text-sm hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
