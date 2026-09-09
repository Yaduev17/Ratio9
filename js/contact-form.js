/**
 * Validates and "submits" the contact form. submitContactForm() is
 * isolated at the top so it's a single, obvious place to point at a
 * real backend (serverless function, Formspree, SendGrid, etc.).
 */

async function submitContactForm(data) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.log("Contact form submitted", data);
}

function validateContactForm(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Tell us a little more about the project (10+ characters).";
  }
  return errors;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      service: form.service.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
    const errors = validateContactForm(data);

    Object.entries(errors).forEach(([key, message]) => {
      const errorEl = form.querySelector(`[data-error-for="${key}"]`);
      if (errorEl) errorEl.textContent = message;
    });

    if (Object.keys(errors).length > 0) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    try {
      await submitContactForm(data);
      statusEl.textContent = "Thanks — your message is in. We'll be in touch shortly.";
      statusEl.className = "form-status success";
      form.reset();
    } catch {
      statusEl.textContent = "Something went wrong sending that. Please try again or email us directly.";
      statusEl.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Start a Project";
    }
  });
});
