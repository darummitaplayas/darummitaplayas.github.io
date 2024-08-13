/**
 * When using native HTML to implement an accordion, we cannot rely solely on using CSS to animate the transition between the collapsed and expanded states.
 *
 * The reason is that the 'open' attribute (automatically added to / removed from the <details> element upon clicking the <summary> element) does not make any transition between the 2 states. Hence it simply cannot be animated, just like the 'hidden' HTML attribute or the CSS 'display' property.
 *
 * Thus we need some JavaScript to modify this default behavior and ensure our animations/transitions have the time to run.
 *
 * Basically, we first define some CSS transitions (grid-template-rows, visibility and opacity) on the panel using 'expanded' as a custom attribute. Then we need to prevent the default accordion behavior so we can first run our transitions prior toggling the 'open' attribute.
 *
 * We also need to take into account the 'prefers-reduced-motion' browser setting which allows disabling animations.
 */

/** *********************************************************
 * Vairble declarations
 ********************************************************** */
const btns = document.querySelectorAll(".accordion-toggle");
const soloSwitch = document.getElementById("switch-toggle");
const soloStatus = document.getElementById("switch-status");

/* Check for user preferences about animations. */
const isAnimateDisabled = window.matchMedia("(prefers-reduced-motion)").matches;

/* Internal state to store the last expanded panel. */
let lastActive = null;

/** *********************************************************
 * Event listeners
 ********************************************************** */
soloSwitch.addEventListener("change", onCheckboxToggle);
btns.forEach((btn) => btn.addEventListener("click", onButtonToggle));

/** *********************************************************
 * Event handlers
 ********************************************************** */
function onCheckboxToggle() {
  const isChecked = this.hasAttribute("checked");

  /* 1. Update UI for the toggle switch. */
  this.toggleAttribute("checked");

  /* 2. Update UI for the toggle switch status text. */
  soloStatus.innerText = isChecked ? "OFF" : " ON";

  /* 3. Close all expanded panel (if any) except the last active one. */
  btns.forEach((btn) => {
    if (btn !== lastActive && isPanelExpanded(btn)) {
      collapsePanel(btn);
    }
  });
}

function onButtonToggle(e) {
  const panel = this.nextElementSibling;
  const isSoloMode = soloSwitch.hasAttribute("checked");

  /* 1. In solo mode, collapse other expanded panels if any. */
  if (isSoloMode) {
    btns.forEach((btn) => {
      if (btn !== this && isPanelExpanded(btn)) {
        collapsePanel(btn);
      }
    });
  }

  /* 2. Expand/collapse selected panel. */
  if (isPanelExpanded(this)) {
    /* On close, first prevent the default behavior (automatically removing the 'open' attribute to the <details> element). */
    e.preventDefault();
    collapsePanel(this);
  } else {
    expandPanel(panel);
  }

  /* 3. Update internal state. */
  lastActive = this;
}

/** *********************************************************
 * Utility functions
 ********************************************************** */
/**
 * On open, stick to the default behavior (the 'open' attribute is automatically added to the <details> element).
 * Simply add custom HTML 'expanded' attribute on accordion's panel to trigger state transition via CSS property.
 */
function expandPanel(nodePanel) {
  if (isAnimateDisabled) {
    nodePanel.setAttribute("expanded", "true");
  } else {
    /* Firefox fix: use a zero-delay timeout to ensure the CSS transition is executed asynchronously and occurs after the 'open' attribute is added. */
    setTimeout(() => {
      nodePanel.setAttribute("expanded", "true");
    }, 0);
  }
}

/**
 * On close, first remove the 'expanded' custom attribute to trigger the collapse CSS transition, then resume to default behavior (removing the 'open' attribute from the <details> element).
 */
function collapsePanel(btn) {
  const panel = btn.nextElementSibling;
  const accordion = btn.parentNode;

  /* Remove the custom attribute regardless animation are allowed or not. */
  panel.removeAttribute("expanded");

  if (isAnimateDisabled) {
    accordion.removeAttribute("open");
  } else {
    /* ...then wait for the CSS collapsing transition to end (one-time event!)... */
    panel.addEventListener(
      "transitionend",
      () => {
        /* ...and finally resume to the default behavior. */
        accordion.removeAttribute("open");
      },
      { once: true }
    );
  }
}

function isPanelExpanded(btnNode) {
  return btnNode.nextElementSibling.hasAttribute("expanded");
}
