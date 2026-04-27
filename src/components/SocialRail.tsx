import styles from "./HeroSection.module.scss";
import { Icon } from "@/components/Icon";

export const socialLinks = [
  { href: "https://github.com/dev-mahmoudakram", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://www.instagram.com/", label: "Instagram", icon: "instagram" },
  { href: "https://www.facebook.com/", label: "Facebook", icon: "facebook" },
  { href: "https://wa.me/", label: "WhatsApp", icon: "whatsapp" },
  { href: "mailto:hello@example.com", label: "Email", icon: "envelope" }
];

export function SocialRail() {
  return (
    <aside className={`${styles.socialRail} ${styles.heroSocialEntrance}`} aria-label="Social links">
      {socialLinks.map((item) => (
        <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={item.label} className={styles.socialLink}>
          <Icon name={item.icon} />
        </a>
      ))}
    </aside>
  );
}
