import styles from "./HeroSection.module.scss";

export const socialLinks = [
  { href: "https://github.com/dev-mahmoudakram", label: "GitHub", icon: "fa-brands fa-github" },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: "fa-brands fa-linkedin-in" },
  { href: "https://www.instagram.com/", label: "Instagram", icon: "fa-brands fa-instagram" },
  { href: "https://www.facebook.com/", label: "Facebook", icon: "fa-brands fa-facebook-f" },
  { href: "https://wa.me/", label: "WhatsApp", icon: "fa-brands fa-whatsapp" },
  { href: "mailto:hello@example.com", label: "Email", icon: "fa-solid fa-envelope" }
];

export function SocialRail() {
  return (
    <aside className={styles.socialRail} aria-label="Social links">
      {socialLinks.map((item) => (
        <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={item.label} className={styles.socialLink}>
          <i className={item.icon} />
        </a>
      ))}
    </aside>
  );
}
