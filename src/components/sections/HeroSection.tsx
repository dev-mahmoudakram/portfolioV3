import Image from "next/image";
import styles from "@/components/HeroSection.module.scss";
import { ScrollDownButton } from "@/components/ScrollDownButton";
import { SocialRail, socialLinks } from "@/components/SocialRail";
import { HeroScrollHijack } from "@/components/HeroScrollHijack";
import { HeroCTAs } from "@/components/HeroCTAs";

export function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      <HeroScrollHijack />
      <div className={`${styles.waveLayer} ${styles.waveLayerAnimated}`} aria-hidden="true">
        <div className={styles.wavePattern} />
      </div>
      <div className={styles.waveLayerSecondary} />
      <div className={styles.waveGlow} />
      <SocialRail />

      <div className={`section-shell ${styles.content}`}>
        <div className="grid min-h-[100svh] items-center gap-6 pb-10 pt-6 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-14 lg:pt-12 xl:pb-16 xl:pt-14">
          <div className="max-w-2xl">
            <p className={`font-poppins text-xl font-medium leading-tight text-white/86 md:text-[1.6rem] ${styles.heroGreeting}`}>
              Hi, I&apos;m <span className={styles.gradientName}>Abdelrahman Yasser</span>
            </p>

            <h1 className={`mt-3 font-fredoka text-[3.4rem] font-semibold leading-[0.88] text-white sm:text-[4.4rem] md:text-[5.2rem] lg:text-[5.6rem] xl:text-[6.2rem] ${styles.heroTitle}`}>
              <span className="block text-white">Software</span>
              <span className={`block ${styles.titleGradient}`}>Engineer</span>
            </h1>

            <p className={`mt-3 font-fredoka text-xl font-medium leading-tight text-white md:text-[1.75rem] ${styles.heroTagline}`}>
              Built to Scale. <span className={styles.titleGradient}>Shipped with Rails.</span>
            </p>

            <p className={`${styles.description} ${styles.heroDescription} mt-4 max-w-xl font-poppins text-base leading-7 text-white/64 md:text-lg`}>
              I build reliable web applications and backend systems using Ruby on Rails, with React and Next.js on the front end.
            </p>

            <HeroCTAs />
          </div>

          <div className={`${styles.visualWrap} ${styles.heroCharacterEntrance}`}>
            <div className="mb-5 flex items-center justify-center gap-3 lg:hidden">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={item.label}
                  className={styles.socialLink}
                >
                  {item.svg}
                </a>
              ))}
            </div>

            <div className={styles.characterShell}>
              <div className={styles.characterGlow} />
              <Image
                src="/images/char/rails-hi.png"
                alt="Abdelrahman Yasser waving character illustration"
                width={1200}
                height={1400}
                sizes="(max-width: 1023px) 78vw, 560px"
                priority
                className={styles.character}
              />
            </div>
            <div className="mt-4 flex justify-center sm:hidden">
              <ScrollDownButton targetId="about" mobile />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.scrollDock} ${styles.heroScrollEntrance}`}>
        <ScrollDownButton targetId="about" />
      </div>
    </section>
  );
}
