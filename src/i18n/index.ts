/*
 * Gestion des langues du site.
 *
 * - Français = langue par défaut, à la racine :  /  /groovs  /sarah ...
 * - Anglais  = sous le préfixe /en :              /en/  /en/groovs  /en/sarah ...
 *
 * La langue est déduite de l'URL. Les pages de `src/pages/en/` réutilisent
 * simplement les pages françaises : il n'y a qu'un seul fichier par page à maintenir.
 */

export const languages = ['fr', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'fr';

/** Langue de la page à partir de son URL : "/en/groovs" -> "en", "/groovs" -> "fr". */
export function getLang(url: URL): Lang {
    const [, first] = url.pathname.split('/');
    return first === 'en' ? 'en' : 'fr';
}

/** Chemin sans préfixe de langue ni slash final : "/en/groovs/" -> "/groovs", "/en/" -> "/". */
export function stripLang(pathname: string): string {
    const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/+$/, '');
    return path || '/';
}

/** Chemin dans la langue voulue : ("/groovs", "en") -> "/en/groovs", ("/", "en") -> "/en/". */
export function localizePath(path: string, lang: Lang): string {
    if (lang === defaultLang) return path;
    return path === '/' ? '/en/' : `/en${path}`;
}

/** Textes communs à toutes les pages (header, footer, libellés récurrents). */
export const ui = {
    fr: {
        defaultDescription: 'Portfolio de Frédéric Vanhoolant, UX/UI Designer et Développeur Web.',
        ogLocale: 'fr_FR',
        langSwitchLabel: 'Langue du site',
        footerHome: 'Accueil',
        footerTop: 'Haut ↑',
        footerArchives: 'Archives',
        footerPrivacy: 'Confidentialité',
        back: '← Retour',
        visitSite: 'Lien vers le site',
        projectDescription: 'Description du projet',
        credits: 'Crédits',
        videoFallback: 'Votre navigateur ne supporte pas la lecture de vidéos.',
    },
    en: {
        defaultDescription: 'Portfolio of Frédéric Vanhoolant, UX/UI Designer and Web Developer.',
        ogLocale: 'en_GB',
        langSwitchLabel: 'Site language',
        footerHome: 'Home',
        footerTop: 'Top ↑',
        footerArchives: 'Archives',
        footerPrivacy: 'Privacy',
        back: '← Back',
        visitSite: 'Visit the website',
        projectDescription: 'Project description',
        credits: 'Credits',
        videoFallback: 'Your browser does not support video playback.',
    },
} as const;
