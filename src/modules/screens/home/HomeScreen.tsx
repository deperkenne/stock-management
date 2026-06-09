import LoginButton from '../../auth/presentation/components/Login';
import NavigationBar,{ type NavLink ,type DropdownConfig} from '../../components/home/navigationBar/NavigationBar';
import HeroSection, { type HeroBullet } from '../../components/home/sections/HeroSection/HeroSection';
import TrustedBySection from '../../components/home/sections/trustedBySection/TrustedBySection';
import FeaturesSection from '../../components/home/sections/featureSection/FeaturesSection';
import FeatureGridSection from '../../components/home/sections/featureGridSection/FeatureGridSection';
import CallToActionSection from '../../components/home/sections/callActionSection/CallToActionSection';



// ─── Hero section data ────────────────────────────────────────────────────────

const HERO_BULLETS: HeroBullet[] = [
  { text: 'Automatic sync (Shopify, Amazon, Store)' },
  { text: 'Smart low-stock alerts via SMS & Email'  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeUi() {
  return (
    <>
      <NavigationBar
        actions={<LoginButton ButtonName="Sign in" />}
        mobileActions={<LoginButton ButtonName="Sign in" className="w-full" />}
      />
      <main className="w-full flex-1">
        <HeroSection
          badge="Version 2.0 available — Smart Management"
          title="Take control of your stock in real time."
          subtitle="No more stockouts or data-entry errors. Automate your inventory, track deliveries and sell with confidence."
          bullets={HERO_BULLETS}
          trustNote="No credit card required. Setup in 5 minutes."
        />
        <TrustedBySection />
        <FeaturesSection />
        <FeatureGridSection />
        <CallToActionSection />
      </main>
    </>
  );
}
