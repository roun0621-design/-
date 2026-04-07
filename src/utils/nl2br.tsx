import React from "react";

/**
 * Converts \n in translation strings to <br /> elements.
 * Use in place of raw {t("key")} when the value may contain line breaks.
 *
 * Usage:
 *   <p>{nl2br(t("hero.description"))}</p>
 */
export function nl2br(text: string): React.ReactNode {
  if (!text || !text.includes("\n")) return text;

  return text.split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));
}
