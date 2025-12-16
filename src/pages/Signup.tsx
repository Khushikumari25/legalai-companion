import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import legalPattern from "@/assets/legal-pattern.jpg";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate signup - will be replaced with actual auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to LegalAI. Your account has been created successfully.",
      });
      navigate("/chat");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6 animate-scale-in">
          <div className="lg:hidden mb-8">
            <Logo size="lg" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Create Account
            </h2>
            <p className="text-muted-foreground">
              Join LegalAI and get expert legal guidance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password requirements */}
              <div className="space-y-1 pt-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className={`flex items-center gap-2 text-xs transition-colors ${req.met ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <Check className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="rounded border-input mt-1" required />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:text-accent/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={legalPattern}
          alt="Legal Pattern"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/80 to-primary/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div />
          <div className="space-y-8 max-w-md animate-fade-in">
            <h1 className="text-4xl font-serif font-bold leading-tight">
              Expert Legal AI at Your Fingertips
            </h1>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Indian Law Expertise</h3>
                  <p className="text-sm opacity-80">Specialized knowledge of Constitution, IPC, CrPC, and more</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant Answers</h3>
                  <p className="text-sm opacity-80">Get accurate legal information within seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-sidebar-accent/30 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Confidential & Secure</h3>
                  <p className="text-sm opacity-80">Your conversations are private and encrypted</p>
                </div>
              </div>
            </div>
          </div>
          <Logo size="lg" variant="light" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
