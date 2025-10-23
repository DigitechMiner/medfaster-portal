import Sidebar from "@/components/sidebar";
import HeroSection from "@/components/herosection";
export default function OrganizationDetails() {
  return (
  <>
  <div className="h-full w-full flex">
    <div className=""> 
    <Sidebar />
    </div>
    <div className="h-screen w-4/5 scale-82 mt-[-60]">
      <HeroSection />
    </div>
    
</div>
  </>
  );
}
