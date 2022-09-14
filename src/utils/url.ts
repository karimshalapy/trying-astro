import i18next from "i18next";

/**
 * Injects the given locale to a path
 */
export const localizePath = (
  path: string = "/",
  locale: string | null = null,
  base: string = import.meta.env.BASE_URL
): string => {
  if (!locale) {
    locale = i18next.language;
  }

  // remove all leading slashes off of path
  path = path.replace(/^\/+|\/+$/g, "");
  path = path === "" ? "/" : "/" + path + "/";

  // remove leading and trailing slashes off of base path
  base = base.replace(/^\/+|\/+$/g, "");
  base = base === "" ? "/" : "/" + base + "/";

  // remove base path if found
  path = path.startsWith(base) ? path.slice(base.length) : path.slice(1);

  if (!(i18next.options.supportedLngs as string[]).includes(locale)) {
    console.warn(
      `WARNING(astro-i18next): "${locale}" locale is not supported, add it to the supportedLngs in your astro config.`
    );
    return base + path;
  }

  let pathSegments = path.split("/");

  if (
    JSON.stringify(pathSegments) === JSON.stringify([""]) ||
    JSON.stringify(pathSegments) === JSON.stringify(["", ""])
  ) {
    return i18next.options.supportedLngs &&
      locale === i18next.options.supportedLngs[0]
      ? base
      : `${base}${locale}/`;
  }

  // make a copy of i18next's supportedLngs
  const otherLocales = [...(i18next.options.supportedLngs as string[])];
  otherLocales.slice(1); // remove base locale (first index)

  // loop over all locales except the base one
  for (const otherLocale of otherLocales) {
    if (pathSegments[0] === otherLocale) {
      // if the path starts with one of the other locales, remove it from the path
      pathSegments.shift();
      break; // no need to continue
    }
  }

  // prepend the given locale if it's not the base one
  if (
    i18next.options.supportedLngs &&
    locale !== i18next.options.supportedLngs[0]
  ) {
    pathSegments = [locale, ...pathSegments];
  }

  return base + pathSegments.join("/");
};

/**
 * Injects the given locale to a url
 */
export const localizeUrl = (
  url: string,
  locale: string | null = null,
  base: string = import.meta.env.BASE_URL
): string => {
  const [protocol, , host, ...path] = url.split("/");
  const baseUrl = protocol + "//" + host;

  return baseUrl + localizePath(path.join("/"), locale, base);
};
