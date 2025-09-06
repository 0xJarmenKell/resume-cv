/**
 * Contact Form with EmailJS Integration
 * Author: Youssef Yousry
 * Description: Handles contact form submission using EmailJS service
 */

// EmailJS Configuration
// Note: Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  publicKey: "Uln6hPc0N5rGI0Gq5", // Replace with your EmailJS public key
  serviceId: "service_umnfiho", // Replace with your EmailJS service ID
  templateId: "template_46khxul", // Replace with your EmailJS template ID
};

// Initialize EmailJS
(function () {
  // Check if EmailJS is loaded
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log("EmailJS initialized successfully");
  } else {
    console.error("EmailJS library not loaded");
  }
})();

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.loadingElement = document.querySelector(".loading");
    this.errorElement = document.querySelector(".error-message");
    this.successElement = document.querySelector(".sent-message");

    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
      this.addFormValidation();
      this.addInteractiveFeatures();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Show loading state
    this.showLoading();

    try {
      // Collect form data
      const formData = new FormData(this.form);
      const templateParams = this.prepareTemplateParams(formData);

      // Validate form data
      if (!this.validateForm(templateParams)) {
        throw new Error("Please fill in all required fields correctly.");
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      if (response.status === 200) {
        this.showSuccess();
        this.resetForm();
        this.trackFormSubmission("success");
      } else {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      this.showError(
        error.message || "An error occurred. Please try again later."
      );
      this.trackFormSubmission("error", error.message);
    } finally {
      this.hideLoading();
    }
  }

  prepareTemplateParams(formData) {
    const currentDate = new Date().toLocaleString();

    return {
      from_name: formData.get("from_name"),
      from_email: formData.get("from_email"),
      company: formData.get("company") || "Not specified",
      phone: formData.get("phone") || "Not provided",
      service_type: formData.get("service_type"),
      priority: formData.get("priority"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      budget: formData.get("budget") || "Not specified",
      timeline: formData.get("timeline") || "Not specified",
      submission_date: currentDate,
      reply_to: formData.get("from_email"),
    };
  }

  validateForm(params) {
    // Required fields validation
    const requiredFields = [
      "from_name",
      "from_email",
      "service_type",
      "subject",
      "message",
    ];

    for (let field of requiredFields) {
      if (!params[field] || params[field].trim() === "") {
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.from_email)) {
      return false;
    }

    return true;
  }

  addFormValidation() {
    // Real-time email validation
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.addEventListener("blur", () => {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
          emailInput.classList.add("is-invalid");
          this.showFieldError(emailInput, "Please enter a valid email address");
        } else {
          emailInput.classList.remove("is-invalid");
          this.hideFieldError(emailInput);
        }
      });
    }

    // Phone number formatting
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 10) {
          value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
        e.target.value = value;
      });
    }
  }

  addInteractiveFeatures() {
    // Character counter for message field
    const messageField = document.getElementById("message");
    if (messageField) {
      const charCounter = document.createElement("small");
      charCounter.className = "text-muted char-counter";
      messageField.parentNode.appendChild(charCounter);

      messageField.addEventListener("input", () => {
        const remaining = 1000 - messageField.value.length;
        charCounter.textContent = `${messageField.value.length}/1000 characters`;

        if (remaining < 100) {
          charCounter.classList.add("text-warning");
        } else {
          charCounter.classList.remove("text-warning");
        }
      });
    }

    // Service type change handler
    const serviceSelect = document.getElementById("service");
    if (serviceSelect) {
      serviceSelect.addEventListener("change", () => {
        this.updateFormBasedOnService(serviceSelect.value);
      });
    }
  }

  updateFormBasedOnService(serviceType) {
    const budgetField = document.getElementById("budget");
    const timelineField = document.getElementById("timeline");

    // Show/hide budget and timeline based on service type
    const needsBudget = [
      "Web Development",
      "System Administration",
      "Cybersecurity Consulting",
    ].includes(serviceType);

    if (budgetField && timelineField) {
      const budgetContainer = budgetField.closest(".form-group");
      const timelineContainer = timelineField.closest(".form-group");

      if (needsBudget) {
        budgetContainer.style.display = "block";
        timelineContainer.style.display = "block";
      } else if (serviceType === "General Inquiry") {
        budgetContainer.style.display = "none";
        timelineContainer.style.display = "none";
      }
    }
  }

  showFieldError(field, message) {
    let errorDiv = field.parentNode.querySelector(".field-error");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.className = "field-error text-danger small mt-1";
      field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  hideFieldError(field) {
    const errorDiv = field.parentNode.querySelector(".field-error");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  showLoading() {
    this.loadingElement.style.display = "block";
    this.errorElement.style.display = "none";
    this.successElement.style.display = "none";

    // Disable submit button
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-spinner-border"></i> Sending...';
    }
  }

  hideLoading() {
    this.loadingElement.style.display = "none";

    // Re-enable submit button
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
    }
  }

  showSuccess() {
    this.successElement.style.display = "block";
    this.errorElement.style.display = "none";

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      this.successElement.style.display = "none";
    }, 5000);
  }

  showError(message) {
    this.errorElement.textContent = message;
    this.errorElement.style.display = "block";
    this.successElement.style.display = "none";

    // Auto-hide error message after 10 seconds
    setTimeout(() => {
      this.errorElement.style.display = "none";
    }, 10000);
  }

  resetForm() {
    this.form.reset();

    // Clear any validation states
    const invalidFields = this.form.querySelectorAll(".is-invalid");
    invalidFields.forEach((field) => field.classList.remove("is-invalid"));

    // Clear field errors
    const fieldErrors = this.form.querySelectorAll(".field-error");
    fieldErrors.forEach((error) => error.remove());

    // Reset character counter
    const charCounter = this.form.querySelector(".char-counter");
    if (charCounter) {
      charCounter.textContent = "0/1000 characters";
      charCounter.classList.remove("text-warning");
    }
  }

  trackFormSubmission(status, error = null) {
    // Analytics tracking (if you have Google Analytics or similar)
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submission", {
        event_category: "Contact",
        event_label: status,
        value: status === "success" ? 1 : 0,
      });
    }

    // Console logging for development
    console.log(`Contact form submission: ${status}`, error ? { error } : "");
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ContactFormHandler();
});

// Utility function to check EmailJS configuration
function checkEmailJSConfiguration() {
  const requiredConfigs = ["publicKey", "serviceId", "templateId"];
  const missingConfigs = requiredConfigs.filter(
    (config) =>
      !EMAILJS_CONFIG[config] || EMAILJS_CONFIG[config].startsWith("YOUR_")
  );

  if (missingConfigs.length > 0) {
    console.warn(
      "EmailJS configuration incomplete. Please update the following in contact.js:",
      missingConfigs
    );
    return false;
  }

  return true;
}

// Export for potential external use
window.ContactFormHandler = ContactFormHandler;
window.checkEmailJSConfiguration = checkEmailJSConfiguration;
