import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "Web Accessibility - Complete Guide",
  description:
    "Complete guide to web accessibility including ARIA, screen readers, semantic HTML, keyboard navigation, and WCAG compliance",
};

// Simple section card component
function SectionCard({
  title,
  id,
  gradient,
  children,
}: {
  title: string;
  id: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        marginBottom: "40px",
        padding: "30px",
        background: "#1e1e2e",
        borderRadius: "12px",
        border: "1px solid #313244",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          marginTop: 0,
          marginBottom: "20px",
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#bac2de", lineHeight: "1.8" }}>{children}</div>
    </section>
  );
}

export default function AccessibilityPage() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              background: "linear-gradient(135deg, #89b4fa 0%, #b4befe 100%)",
              borderRadius: "12px",
              padding: "10px 15px",
              lineHeight: 1,
            }}
          >
            ♿
          </div>
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                margin: 0,
                background: "linear-gradient(135deg, #89b4fa 0%, #b4befe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Web Accessibility (A11y)
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#6c7086",
                margin: "5px 0 0 0",
              }}
            >
              Making the web accessible to everyone, including users with
              disabilities
            </p>
          </div>
        </div>
      </div>

      {/* What is Accessibility */}
      <SectionCard
        title="What is Web Accessibility?"
        id="what-is-accessibility"
        gradient="linear-gradient(135deg, #89b4fa 0%, #b4befe 100%)"
      >
        <p>
          <strong>Web Accessibility (A11y)</strong> means designing and
          developing websites, tools, and technologies so that people with
          disabilities can use them. It ensures equal access and equal
          opportunity to people with diverse abilities.
        </p>

        <h3>Core Principles (POUR)</h3>
        <ul>
          <li>
            <strong>Perceivable:</strong> Information and user interface
            components must be presentable to users in ways they can perceive
            (sight, hearing, touch)
          </li>
          <li>
            <strong>Operable:</strong> User interface components and navigation
            must be operable (keyboard, mouse, voice, etc.)
          </li>
          <li>
            <strong>Understandable:</strong> Information and operation of user
            interface must be understandable
          </li>
          <li>
            <strong>Robust:</strong> Content must be robust enough to be
            interpreted by a wide variety of user agents, including assistive
            technologies
          </li>
        </ul>

        <h3>Who Benefits from Accessibility?</h3>
        <ul>
          <li>
            👁️ People with visual impairments (blindness, low vision, color
            blindness)
          </li>
          <li>
            👂 People with auditory impairments (deafness, hard of hearing)
          </li>
          <li>
            🧠 People with cognitive disabilities (dyslexia, ADHD, autism)
          </li>
          <li>🖐️ People with motor disabilities (limited mobility, tremors)</li>
          <li>👴 Elderly users with changing abilities</li>
          <li>
            📱 Users with temporary disabilities (broken arm, bright sunlight)
          </li>
          <li>
            🌐 Users with situational limitations (slow internet, small screens)
          </li>
        </ul>
      </SectionCard>

      {/* Why Accessibility Matters */}
      <SectionCard
        title="Why Accessibility Matters"
        id="why-accessibility"
        gradient="linear-gradient(135deg, #f38ba8 0%, #eba0ac 100%)"
      >
        <h3>1. Legal & Compliance</h3>
        <ul>
          <li>
            <strong>ADA (Americans with Disabilities Act):</strong> Required for
            US government websites and public accommodations
          </li>
          <li>
            <strong>Section 508:</strong> Federal agencies must make electronic
            content accessible
          </li>
          <li>
            <strong>WCAG (Web Content Accessibility Guidelines):</strong>{" "}
            International standard (A, AA, AAA levels)
          </li>
          <li>
            <strong>European Accessibility Act:</strong> Applies to EU member
            states
          </li>
        </ul>

        <h3>2. Business Benefits</h3>
        <ul>
          <li>
            📈 <strong>Larger Audience:</strong> 15% of world population has
            disabilities (1+ billion people)
          </li>
          <li>
            💰 <strong>Market Advantage:</strong> Accessible sites reach more
            customers
          </li>
          <li>
            🔍 <strong>Better SEO:</strong> Semantic HTML and alt text improve
            search rankings
          </li>
          <li>
            📱 <strong>Improved UX:</strong> Benefits all users, not just those
            with disabilities
          </li>
          <li>
            ⚡ <strong>Performance:</strong> Accessible sites are often faster
            and more efficient
          </li>
        </ul>

        <h3>3. Ethical Responsibility</h3>
        <p>
          The web should be accessible to everyone regardless of ability. It's
          about inclusivity and equal access to information and services.
        </p>
      </SectionCard>

      {/* Semantic HTML */}
      <SectionCard
        title="Semantic HTML - Foundation of Accessibility"
        id="semantic-html"
        gradient="linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%)"
      >
        <p>
          Semantic HTML uses meaningful elements that describe their content.
          This is crucial for screen readers and assistive technologies.
        </p>

        <h3>✅ Good: Semantic Elements</h3>
        <CodeBlock
          code={`<!-- Proper semantic structure -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
  
  <aside>
    <h2>Related Links</h2>
    <ul>
      <li><a href="#">Link 1</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2026 Company Name</p>
</footer>`}
          language="html"
        />

        <h3>❌ Bad: Non-semantic Elements</h3>
        <CodeBlock
          code={`<!-- Don't use divs for everything -->
<div class="header">
  <div class="nav">
    <div class="menu-item">Home</div>
    <div class="menu-item">About</div>
  </div>
</div>

<div class="main">
  <div class="content">
    <span class="title">Article Title</span>
    <div>Article content...</div>
  </div>
</div>`}
          language="html"
        />

        <h3>Key Semantic Elements</h3>
        <ul>
          <li>
            <code>&lt;header&gt;</code> - Site/page header
          </li>
          <li>
            <code>&lt;nav&gt;</code> - Navigation links
          </li>
          <li>
            <code>&lt;main&gt;</code> - Main content (only one per page)
          </li>
          <li>
            <code>&lt;article&gt;</code> - Self-contained content
          </li>
          <li>
            <code>&lt;section&gt;</code> - Thematic grouping of content
          </li>
          <li>
            <code>&lt;aside&gt;</code> - Sidebar or tangential content
          </li>
          <li>
            <code>&lt;footer&gt;</code> - Site/page footer
          </li>
          <li>
            <code>&lt;h1&gt;-&lt;h6&gt;</code> - Headings (proper hierarchy)
          </li>
          <li>
            <code>&lt;button&gt;</code> - Interactive buttons
          </li>
          <li>
            <code>&lt;a&gt;</code> - Links for navigation
          </li>
        </ul>
      </SectionCard>

      {/* ARIA - Accessible Rich Internet Applications */}
      <SectionCard
        title="ARIA - Accessible Rich Internet Applications"
        id="aria"
        gradient="linear-gradient(135deg, #f9e2af 0%, #fab387 100%)"
      >
        <p>
          <strong>ARIA</strong> provides a way to make web content and
          applications more accessible when semantic HTML alone isn't enough.
          It's especially useful for dynamic content and complex UI components.
        </p>

        <h3>⚠️ First Rule of ARIA</h3>
        <p
          style={{
            background: "#1e1e2e",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <strong>
            "Don't use ARIA if you can use semantic HTML instead!"
          </strong>
          <br />
          Native HTML elements have built-in accessibility features. Only use
          ARIA when HTML can't provide the semantics you need.
        </p>

        <h3>ARIA Attributes Categories</h3>

        <h4>1. ARIA Roles</h4>
        <p>Define what an element is or does</p>
        <CodeBlock
          code={`<!-- Landmark roles -->
<div role="banner">Site header</div>
<div role="navigation">Nav menu</div>
<div role="main">Main content</div>
<div role="complementary">Sidebar</div>
<div role="contentinfo">Footer</div>

<!-- Widget roles -->
<div role="button">Click me</div>
<div role="tab">Tab 1</div>
<div role="tabpanel">Tab content</div>
<div role="dialog">Modal content</div>
<div role="alert">Important message!</div>
<div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>

<!-- ⚠️ Better: Use semantic HTML when possible -->
<button>Click me</button> <!-- Instead of div role="button" -->
<nav>Nav menu</nav> <!-- Instead of div role="navigation" -->`}
          language="html"
        />

        <h4>2. ARIA States & Properties</h4>
        <p>Describe the current state or properties of elements</p>
        <CodeBlock
          code={`<!-- aria-label: Provides accessible name -->
<button aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</button>

<!-- aria-labelledby: References another element for label -->
<h2 id="modal-title">Confirmation</h2>
<div role="dialog" aria-labelledby="modal-title">
  Are you sure?
</div>

<!-- aria-describedby: Provides additional description -->
<input 
  type="password" 
  aria-describedby="password-hint"
  id="password"
/>
<span id="password-hint">
  Password must be at least 8 characters
</span>

<!-- aria-expanded: Indicates expansion state -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>
  <li>Item 1</li>
</ul>

<!-- aria-hidden: Hides from screen readers -->
<span aria-hidden="true">🎉</span>
<span class="sr-only">Celebration icon</span>

<!-- aria-live: Announces dynamic content -->
<div aria-live="polite" role="status">
  Item added to cart
</div>

<!-- aria-current: Indicates current item -->
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>

<!-- aria-disabled: Indicates disabled state -->
<button aria-disabled="true">Submit</button>

<!-- aria-required: Indicates required field -->
<input type="text" aria-required="true" />

<!-- aria-invalid: Indicates validation error -->
<input 
  type="email" 
  aria-invalid="true" 
  aria-describedby="email-error"
/>
<span id="email-error">Please enter a valid email</span>`}
          language="html"
        />

        <h4>3. ARIA Live Regions</h4>
        <p>Announce dynamic content changes to screen readers</p>
        <CodeBlock
          code={`<!-- aria-live values -->
<div aria-live="off">Not announced</div>
<div aria-live="polite">Announced when user is idle</div>
<div aria-live="assertive">Announced immediately</div>

<!-- Status messages -->
<div role="status" aria-live="polite">
  Form saved successfully
</div>

<!-- Alerts -->
<div role="alert" aria-live="assertive">
  Error: Connection lost
</div>

<!-- Loading states -->
<div role="status" aria-live="polite" aria-busy="true">
  Loading content...
</div>`}
          language="html"
        />

        <h3>React Example with ARIA</h3>
        <CodeBlock
          code={`import { useState, useRef, useEffect } from 'react';

export default function AccessibleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus modal when opened
      modalRef.current?.focus();
    } else {
      // Return focus to button when closed
      openButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Trap focus inside modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
      >
        Open Modal
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
            }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabIndex={-1}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <h2 id="modal-title">Confirm Action</h2>
            <p id="modal-description">
              Are you sure you want to proceed?
            </p>
            <div>
              <button onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button onClick={() => {
                // Handle confirm
                setIsOpen(false);
              }}>
                Confirm
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close dialog"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </>
      )}
    </>
  );
}`}
          language="typescript"
        />
      </SectionCard>

      {/* Screen Readers */}
      <SectionCard
        title="Screen Readers & Assistive Technologies"
        id="screen-readers"
        gradient="linear-gradient(135deg, #cba6f7 0%, #f5c2e7 100%)"
      >
        <p>
          <strong>Screen readers</strong> are software programs that read the
          content of the screen aloud to users who are blind or have low vision.
          Understanding how they work is crucial for building accessible
          websites.
        </p>

        <h3>Popular Screen Readers</h3>
        <ul>
          <li>
            <strong>NVDA (NonVisual Desktop Access):</strong> Free, Windows
            (most popular)
          </li>
          <li>
            <strong>JAWS (Job Access With Speech):</strong> Commercial, Windows
            (enterprise)
          </li>
          <li>
            <strong>VoiceOver:</strong> Built-in, macOS and iOS
          </li>
          <li>
            <strong>TalkBack:</strong> Built-in, Android
          </li>
          <li>
            <strong>Narrator:</strong> Built-in, Windows
          </li>
        </ul>

        <h3>How Screen Readers Navigate</h3>
        <ul>
          <li>
            📋 <strong>Landmarks:</strong> Jump between regions (header, nav,
            main, footer)
          </li>
          <li>
            📑 <strong>Headings:</strong> Navigate by heading levels (H1, H2,
            H3...)
          </li>
          <li>
            🔗 <strong>Links:</strong> List all links on page
          </li>
          <li>
            📝 <strong>Forms:</strong> Jump between form fields
          </li>
          <li>
            🖼️ <strong>Images:</strong> Read alt text
          </li>
          <li>
            📊 <strong>Tables:</strong> Navigate by rows/columns
          </li>
          <li>
            📍 <strong>Lists:</strong> Announce list items
          </li>
        </ul>

        <h3>Screen Reader Only Text (sr-only)</h3>
        <CodeBlock
          code={`/* CSS for screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* For focusable elements */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}`}
          language="css"
        />

        <CodeBlock
          code={`<!-- Usage examples -->
<button>
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Delete item</span>
</button>

<!-- Skip to main content link -->
<a href="#main-content" class="sr-only-focusable">
  Skip to main content
</a>
<main id="main-content">
  <!-- Content -->
</main>

<!-- Icon with accessible text -->
<span aria-hidden="true">🔍</span>
<span class="sr-only">Search</span>`}
          language="html"
        />

        <h3>Testing with Screen Readers</h3>
        <CodeBlock
          code={`// VoiceOver on macOS
// Cmd + F5 to toggle

// Common commands:
// - Control + Option + Right Arrow: Read next item
// - Control + Option + Command + H: Next heading
// - Control + Option + U: Rotor (lists headings, links, etc.)

// NVDA on Windows (Free!)
// Install from nvaccess.org
// Common commands:
// - NVDA + Down Arrow: Read next item
// - H: Next heading
// - Insert + F7: Elements list`}
          language="javascript"
        />

        <h3>Best Practices for Screen Readers</h3>
        <ul>
          <li>✅ Use semantic HTML elements</li>
          <li>✅ Provide meaningful alt text for images</li>
          <li>✅ Use proper heading hierarchy (don't skip levels)</li>
          <li>✅ Label form fields properly</li>
          <li>✅ Announce dynamic content changes (aria-live)</li>
          <li>✅ Provide skip links to main content</li>
          <li>❌ Don't use "click here" for link text</li>
          <li>❌ Don't rely only on visual cues (color, position)</li>
          <li>❌ Don't disable focus outlines without alternatives</li>
        </ul>
      </SectionCard>

      {/* Keyboard Navigation */}
      <SectionCard
        title="Keyboard Navigation & Focus Management"
        id="keyboard-navigation"
        gradient="linear-gradient(135deg, #585b70 0%, #7f849c 100%)"
      >
        <p>
          Many users rely on keyboards instead of mice. All functionality must
          be accessible via keyboard alone.
        </p>

        <h3>Standard Keyboard Navigation</h3>
        <ul>
          <li>
            <code>Tab</code> - Move focus forward
          </li>
          <li>
            <code>Shift + Tab</code> - Move focus backward
          </li>
          <li>
            <code>Enter</code> - Activate buttons/links
          </li>
          <li>
            <code>Space</code> - Activate buttons, toggle checkboxes
          </li>
          <li>
            <code>Arrow keys</code> - Navigate within components (tabs, menus)
          </li>
          <li>
            <code>Escape</code> - Close dialogs/menus
          </li>
          <li>
            <code>Home/End</code> - Jump to start/end
          </li>
        </ul>

        <h3>Focus Indicators</h3>
        <CodeBlock
          code={`/* ❌ Don't do this! */
* {
  outline: none;
}

/* ✅ Provide clear focus indicators */
:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}

/* ✅ Remove only when providing alternative */
:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
}

/* ✅ Use :focus-visible for keyboard-only focus */
:focus-visible {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}

/* Match hover and focus styles */
button:hover,
button:focus-visible {
  background: #357ABD;
  transform: scale(1.05);
}`}
          language="css"
        />

        <h3>Tab Index</h3>
        <CodeBlock
          code={`<!-- tabindex="0" - Natural tab order, makes element focusable -->
<div tabindex="0" role="button">Focusable div</div>

<!-- tabindex="-1" - Not in tab order, but programmatically focusable -->
<div tabindex="-1" id="error-message">Error details</div>

<!-- ❌ tabindex="1+" - Avoid positive values! They break natural order -->
<input tabindex="1" /> <!-- Don't do this! -->

<!-- ✅ Use semantic elements instead -->
<button>I'm naturally focusable</button>
<a href="#">I'm naturally focusable</a>
<input type="text" /> <!-- Naturally focusable -->`}
          language="html"
        />

        <h3>Focus Trap in Modals</h3>
        <CodeBlock
          code={`import { useEffect, useRef } from 'react';

export default function FocusTrap({ children, isOpen }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    // Get all focusable elements
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    firstFocusableRef.current = focusableElements[0];
    lastFocusableRef.current = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstFocusableRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return <div ref={containerRef}>{children}</div>;
}`}
          language="typescript"
        />

        <h3>Skip Links</h3>
        <CodeBlock
          code={`<!-- Allows keyboard users to skip navigation -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<nav>
  <!-- Navigation items -->
</nav>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>`}
          language="html"
        />
      </SectionCard>

      {/* Images & Alt Text */}
      <SectionCard
        title="Images & Alternative Text"
        id="images-alt-text"
        gradient="linear-gradient(135deg, #89dceb 0%, #74c7ec 100%)"
      >
        <p>
          All images must have alternative text that conveys the same
          information as the image for users who can't see it.
        </p>

        <h3>When to Use Alt Text</h3>
        <CodeBlock
          code={`<!-- ✅ Informative images - Describe the content -->
<img 
  src="chart.png" 
  alt="Bar chart showing 50% increase in sales from 2024 to 2025"
/>

<!-- ✅ Functional images - Describe the function -->
<a href="/home">
  <img src="logo.png" alt="Company Name - Home" />
</a>

<button>
  <img src="search-icon.png" alt="Search" />
</button>

<!-- ✅ Decorative images - Empty alt -->
<img src="decorative-border.png" alt="" />
<!-- Or use CSS background images -->

<!-- ✅ Complex images - Provide longer description -->
<figure>
  <img 
    src="complex-diagram.png" 
    alt="Architecture diagram"
    aria-describedby="diagram-description"
  />
  <figcaption id="diagram-description">
    Detailed description of the system architecture...
  </figcaption>
</figure>

<!-- ❌ Don't do this -->
<img src="cat.jpg" alt="image" />
<img src="cat.jpg" alt="cat.jpg" />
<img src="cat.jpg" alt="Click here" />
<img src="cat.jpg" /> <!-- Missing alt! -->

<!-- ✅ Better -->
<img src="cat.jpg" alt="Orange tabby cat sleeping on a blue couch" />`}
          language="html"
        />

        <h3>React/Next.js Image Components</h3>
        <CodeBlock
          code={`import Image from 'next/image';

// ✅ Always provide alt text
<Image
  src="/product.jpg"
  alt="Modern desk lamp with adjustable arm"
  width={300}
  height={400}
/>

// ✅ Decorative images
<Image
  src="/decorative.jpg"
  alt=""
  aria-hidden="true"
  width={300}
  height={400}
/>

// ✅ Background images for decoration
<div 
  style={{ backgroundImage: 'url(/decorative.jpg)' }}
  role="presentation"
>
  Content
</div>`}
          language="typescript"
        />

        <h3>Text in Images</h3>
        <ul>
          <li>❌ Avoid text in images when possible</li>
          <li>✅ Use actual HTML text instead</li>
          <li>✅ If text is in image, include all text in alt attribute</li>
          <li>✅ Use SVG with embedded text for scalability</li>
        </ul>
      </SectionCard>

      {/* Forms Accessibility */}
      <SectionCard
        title="Accessible Forms"
        id="forms-accessibility"
        gradient="linear-gradient(135deg, #fab387 0%, #f38ba8 100%)"
      >
        <p>
          Forms are critical for user interaction and must be fully accessible
          to all users.
        </p>

        <h3>Form Labels & Instructions</h3>
        <CodeBlock
          code={`<!-- ✅ Always label inputs -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required />

<!-- ✅ Complex labels with descriptions -->
<label for="password">
  Password
  <span aria-describedby="password-help">(required)</span>
</label>
<input 
  type="password" 
  id="password" 
  name="password"
  aria-describedby="password-help"
  required
/>
<small id="password-help">
  Must be at least 8 characters with numbers and letters
</small>

<!-- ✅ Placeholder is NOT a label replacement -->
<label for="search">Search</label>
<input 
  type="search" 
  id="search" 
  placeholder="Enter keywords..."
/>

<!-- ❌ Don't do this -->
<input type="text" placeholder="Name" /> <!-- No label! -->

<!-- ✅ Group related fields -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input type="text" id="street" />
  
  <label for="city">City</label>
  <input type="text" id="city" />
</fieldset>

<!-- ✅ Radio buttons and checkboxes -->
<fieldset>
  <legend>Choose your subscription:</legend>
  
  <input type="radio" id="free" name="plan" value="free" />
  <label for="free">Free Plan</label>
  
  <input type="radio" id="pro" name="plan" value="pro" />
  <label for="pro">Pro Plan</label>
</fieldset>`}
          language="html"
        />

        <h3>Error Handling</h3>
        <CodeBlock
          code={`<!-- Error summary at top -->
<div role="alert" aria-live="assertive">
  <h2>There are 2 errors in this form:</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
    <li><a href="#password">Password is too short</a></li>
  </ul>
</div>

<!-- Individual field errors -->
<label for="email">Email Address</label>
<input 
  type="email" 
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Please enter a valid email address
</span>

<style>
/* Visual error styling */
input[aria-invalid="true"] {
  border-color: #f38ba8;
}

[role="alert"] {
  color: #f38ba8;
  font-weight: 600;
}
</style>`}
          language="html"
        />

        <h3>React Form Example</h3>
        <CodeBlock
          code={`import { useState } from 'react';

export default function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string) => {
    if (name === 'email' && !value.includes('@')) {
      return 'Please enter a valid email';
    }
    if (name === 'password' && value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  return (
    <form>
      {/* Error summary */}
      {Object.keys(errors).some(key => errors[key]) && (
        <div role="alert" aria-live="polite">
          <h2>Please fix the following errors:</h2>
          <ul>
            {Object.entries(errors).map(([field, error]) => 
              error ? (
                <li key={field}>
                  <a href={\`#\${field}\`}>{error}</a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      {/* Email field */}
      <div>
        <label htmlFor="email">
          Email Address
          <span aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <span id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Password field */}
      <div>
        <label htmlFor="password">
          Password
          <span aria-label="required">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          aria-required="true"
          aria-invalid={touched.password && !!errors.password}
          aria-describedby="password-help password-error"
          onBlur={handleBlur}
        />
        <small id="password-help">
          Must be at least 8 characters
        </small>
        {touched.password && errors.password && (
          <span id="password-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}`}
          language="typescript"
        />
      </SectionCard>

      {/* Color & Contrast */}
      <SectionCard
        title="Color & Contrast"
        id="color-contrast"
        gradient="linear-gradient(135deg, #f5c2e7 0%, #cba6f7 100%)"
      >
        <p>
          Proper color contrast ensures text is readable for users with low
          vision or color blindness.
        </p>

        <h3>WCAG Contrast Requirements</h3>
        <ul>
          <li>
            <strong>Level AA (Minimum):</strong>
            <ul>
              <li>4.5:1 for normal text (under 18px or under 14px bold)</li>
              <li>3:1 for large text (18px+ or 14px+ bold)</li>
              <li>3:1 for UI components and graphics</li>
            </ul>
          </li>
          <li>
            <strong>Level AAA (Enhanced):</strong>
            <ul>
              <li>7:1 for normal text</li>
              <li>4.5:1 for large text</li>
            </ul>
          </li>
        </ul>

        <h3>Testing Contrast</h3>
        <CodeBlock
          code={`/* ✅ Good contrast (4.5:1+) */
.text {
  color: #000000; /* Black */
  background: #FFFFFF; /* White */
  /* Contrast ratio: 21:1 */
}

.button {
  color: #FFFFFF; /* White */
  background: #0066CC; /* Blue */
  /* Contrast ratio: 4.55:1 */
}

/* ❌ Poor contrast (below 4.5:1) */
.bad-text {
  color: #777777; /* Light gray */
  background: #FFFFFF; /* White */
  /* Contrast ratio: 4.4:1 - Not enough! */
}

/* Tools to check contrast: */
// - WebAIM Contrast Checker: webaim.org/resources/contrastchecker/
// - Chrome DevTools: Inspect element > Accessibility panel
// - Browser extension: "WAVE" or "axe DevTools"`}
          language="css"
        />

        <h3>Don't Rely on Color Alone</h3>
        <CodeBlock
          code={`<!-- ❌ Color only -->
<span style="color: red;">Required field</span>

<!-- ✅ Color + icon + text -->
<span style="color: #f38ba8;">
  <span aria-hidden="true">*</span>
  <span class="sr-only">Required: </span>
  Required field
</span>

<!-- ❌ Color-coded status -->
<div style="background: green;">Success</div>
<div style="background: red;">Error</div>

<!-- ✅ Color + icon + text -->
<div style="background: #a6e3a1;">
  <span aria-hidden="true">✓</span>
  Success
</div>
<div style="background: #f38ba8;">
  <span aria-hidden="true">✗</span>
  Error
</div>`}
          language="html"
        />

        <h3>Focus Indicators</h3>
        <CodeBlock
          code={`/* ✅ Visible focus with sufficient contrast */
:focus-visible {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* ✅ High contrast mode compatible */
@media (prefers-contrast: high) {
  :focus-visible {
    outline-width: 3px;
  }
}`}
          language="css"
        />
      </SectionCard>

      {/* Responsive & Mobile Accessibility */}
      <SectionCard
        title="Responsive & Mobile Accessibility"
        id="responsive-accessibility"
        gradient="linear-gradient(135deg, #89b4fa 0%, #74c7ec 100%)"
      >
        <h3>Touch Targets</h3>
        <p>Make interactive elements large enough to tap easily.</p>
        <CodeBlock
          code={`/* ✅ WCAG 2.1: Minimum 44x44 CSS pixels */
button, 
a, 
input[type="checkbox"],
input[type="radio"] {
  min-width: 44px;
  min-height: 44px;
  /* Or use padding to reach 44px */
  padding: 12px 16px;
}

/* ✅ Spacing between touch targets */
.button-group button {
  margin: 8px;
}

/* ❌ Too small */
.icon-button {
  width: 20px;
  height: 20px; /* Not accessible! */
}`}
          language="css"
        />

        <h3>Viewport & Zoom</h3>
        <CodeBlock
          code={`<!-- ✅ Allow zoom -->
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1"
/>

<!-- ❌ Don't disable zoom -->
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>

/* ✅ Use relative units for text */
body {
  font-size: 16px; /* Base */
}

h1 {
  font-size: 2rem; /* Scales with user preferences */
}

/* ❌ Avoid fixed pixel sizes for text */
p {
  font-size: 12px; /* Doesn't scale! */
}`}
          language="html"
        />

        <h3>Orientation</h3>
        <CodeBlock
          code={`/* ✅ Support both portrait and landscape */
@media (orientation: landscape) {
  .container {
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  .container {
    flex-direction: column;
  }
}

/* Don't force orientation */
/* Let users choose! */`}
          language="css"
        />
      </SectionCard>

      {/* Testing & Tools */}
      <SectionCard
        title="Testing Tools & Resources"
        id="testing-tools"
        gradient="linear-gradient(135deg, #94e2d5 0%, #a6e3a1 100%)"
      >
        <h3>Browser DevTools</h3>
        <ul>
          <li>
            <strong>Chrome DevTools:</strong>
            <ul>
              <li>Lighthouse (Accessibility audit)</li>
              <li>Accessibility panel (inspect element)</li>
              <li>Contrast ratio checker</li>
            </ul>
          </li>
          <li>
            <strong>Firefox DevTools:</strong>
            <ul>
              <li>Accessibility Inspector</li>
              <li>Check for issues panel</li>
            </ul>
          </li>
        </ul>

        <h3>Browser Extensions</h3>
        <ul>
          <li>
            <strong>axe DevTools:</strong> Comprehensive accessibility testing
          </li>
          <li>
            <strong>WAVE:</strong> Visual feedback about accessibility
          </li>
          <li>
            <strong>Lighthouse:</strong> Built into Chrome DevTools
          </li>
          <li>
            <strong>NVDA:</strong> Free screen reader for Windows
          </li>
        </ul>

        <h3>Automated Testing Libraries</h3>
        <CodeBlock
          code={`// Install jest-axe
npm install --save-dev jest-axe @axe-core/react

// Test with jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Cypress accessibility testing
npm install --save-dev cypress-axe

// cypress/e2e/accessibility.cy.ts
describe('Accessibility', () => {
  it('has no detectable a11y violations', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y();
  });
});`}
          language="javascript"
        />

        <h3>Manual Testing Checklist</h3>
        <ul>
          <li>
            ✅ Navigate entire site with keyboard only (Tab, Shift+Tab, Enter,
            Space)
          </li>
          <li>✅ Test with screen reader (NVDA, VoiceOver, JAWS)</li>
          <li>✅ Zoom to 200% and verify layout doesn't break</li>
          <li>✅ Test in high contrast mode</li>
          <li>✅ Verify focus indicators are visible</li>
          <li>✅ Check color contrast ratios</li>
          <li>✅ Disable CSS and verify content makes sense</li>
          <li>✅ Test on mobile devices</li>
          <li>✅ Verify all images have alt text</li>
          <li>✅ Check form labels and error messages</li>
        </ul>

        <h3>Resources</h3>
        <ul>
          <li>
            📚 <strong>WCAG Guidelines:</strong> w3.org/WAI/WCAG21/quickref/
          </li>
          <li>
            📚 <strong>MDN Web Accessibility:</strong>{" "}
            developer.mozilla.org/en-US/docs/Web/Accessibility
          </li>
          <li>
            📚 <strong>WebAIM:</strong> webaim.org
          </li>
          <li>
            📚 <strong>A11y Project:</strong> a11yproject.com
          </li>
          <li>
            📚 <strong>ARIA Authoring Practices:</strong> w3.org/WAI/ARIA/apg/
          </li>
        </ul>
      </SectionCard>

      {/* Quick Reference */}
      <SectionCard
        title="Quick Reference Checklist"
        id="checklist"
        gradient="linear-gradient(135deg, #f38ba8 0%, #f5c2e7 100%)"
      >
        <h3>Essential Accessibility Checklist</h3>

        <h4>✅ HTML Structure</h4>
        <ul>
          <li>
            Use semantic HTML elements (<code>&lt;header&gt;</code>,{" "}
            <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, etc.)
          </li>
          <li>Proper heading hierarchy (H1 → H2 → H3, don't skip)</li>
          <li>
            One <code>&lt;main&gt;</code> element per page
          </li>
          <li>Landmarks for page regions</li>
        </ul>

        <h4>✅ Images</h4>
        <ul>
          <li>All images have alt text</li>
          <li>
            Decorative images use <code>alt=""</code>
          </li>
          <li>Complex images have detailed descriptions</li>
        </ul>

        <h4>✅ Forms</h4>
        <ul>
          <li>All inputs have labels</li>
          <li>
            Required fields marked with <code>required</code> or{" "}
            <code>aria-required</code>
          </li>
          <li>Errors announced and linked to fields</li>
          <li>Instructions provided before form</li>
        </ul>

        <h4>✅ Keyboard</h4>
        <ul>
          <li>All functionality accessible via keyboard</li>
          <li>Visible focus indicators</li>
          <li>Logical tab order</li>
          <li>Skip links to main content</li>
          <li>Modal focus trap</li>
        </ul>

        <h4>✅ ARIA</h4>
        <ul>
          <li>Use semantic HTML first</li>
          <li>ARIA roles for custom components</li>
          <li>ARIA states updated dynamically</li>
          <li>Live regions for announcements</li>
        </ul>

        <h4>✅ Color & Contrast</h4>
        <ul>
          <li>Text has 4.5:1 contrast minimum</li>
          <li>Don't rely on color alone</li>
          <li>Focus indicators have 3:1 contrast</li>
        </ul>

        <h4>✅ Mobile</h4>
        <ul>
          <li>Touch targets at least 44x44px</li>
          <li>Don't disable zoom</li>
          <li>Support both orientations</li>
        </ul>

        <h4>✅ Testing</h4>
        <ul>
          <li>Automated testing (axe, Lighthouse)</li>
          <li>Keyboard navigation testing</li>
          <li>Screen reader testing</li>
          <li>Zoom to 200%</li>
        </ul>
      </SectionCard>

      {/* Common Patterns */}
      <SectionCard
        title="Common Accessible Component Patterns"
        id="common-patterns"
        gradient="linear-gradient(135deg, #74c7ec 0%, #89dceb 100%)"
      >
        <h3>Accessible Button</h3>
        <CodeBlock
          code={`// Use native button when possible
<button onClick={handleClick}>
  Click Me
</button>

// Icon button with label
<button aria-label="Close">
  <span aria-hidden="true">×</span>
</button>

// Icon + text
<button>
  <svg aria-hidden="true">...</svg>
  <span>Delete</span>
</button>

// If you must use div (avoid!)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click Me
</div>`}
          language="typescript"
        />

        <h3>Accessible Tabs</h3>
        <CodeBlock
          code={`export default function AccessibleTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div>
      <div role="tablist" aria-label="Example tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={\`panel-\${index}\`}
            id={\`tab-\${index}\`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                setActiveTab((activeTab + 1) % tabs.length);
              } else if (e.key === 'ArrowLeft') {
                setActiveTab((activeTab - 1 + tabs.length) % tabs.length);
              }
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={\`panel-\${index}\`}
          aria-labelledby={\`tab-\${index}\`}
          hidden={activeTab !== index}
          tabIndex={0}
        >
          Content for {tab}
        </div>
      ))}
    </div>
  );
}`}
          language="typescript"
        />

        <h3>Accessible Dropdown Menu</h3>
        <CodeBlock
          code={`export default function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      {isOpen && (
        <ul role="menu">
          <li role="none">
            <button role="menuitem" onClick={() => {}}>
              Option 1
            </button>
          </li>
          <li role="none">
            <button role="menuitem" onClick={() => {}}>
              Option 2
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}`}
          language="typescript"
        />

        <h3>Accessible Loading State</h3>
        <CodeBlock
          code={`export default function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      disabled={isLoading}
      aria-busy={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await fetch('/api/endpoint');
        setIsLoading(false);
      }}
    >
      {isLoading ? (
        <>
          <span aria-hidden="true">⏳</span>
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        'Submit'
      )}
    </button>
  );
}`}
          language="typescript"
        />
      </SectionCard>
    </div>
  );
}
