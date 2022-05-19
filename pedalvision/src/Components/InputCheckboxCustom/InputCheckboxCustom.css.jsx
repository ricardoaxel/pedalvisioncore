import { css } from "@emotion/react";
export const Style = () => {
  return css`
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    /* background-color: var(--form-background); */
    /* Not removed via appearance */
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1em;
    height: 1em;
    border: 0.1em solid #767676;
    border-radius: 0.3em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;

    ::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
      /* Windows High Contrast Mode */
      background-color: white;
    }
    :checked {
      background-color: #0075ff;
      border: none;
    }
    :checked::before {
      transform: scale(1);
    }

    :focus {
      outline: max(1px, 0.1em) solid #cacbd1;
      outline-offset: max(1px, 0.05em);
    }

    :disabled {
      --form-control-color: var(--form-control-disabled);

      color: var(--form-control-disabled);
      cursor: not-allowed;
    }
  `;
};
