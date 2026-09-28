// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for generic anchor links (excluding TOC links which are handled separately)
  document.querySelectorAll('a[href^="#"]:not(.toc-item):not(#toc-back-to-top)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add active state to top navigation based on current page
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if ((href === '/' && currentPath === '/') ||
        (href !== '/' && currentPath.startsWith(href))) {
      item.classList.add('active');
    }
  });

  // Initialize Post Table of Contents (TOC)
  initPostTOC();
});

/**
 * Initialize Table of Contents for Blog Posts
 * Generates sticky TOC on the left (desktop) and collapsible TOC (mobile)
 * Supports smooth scrolling and ScrollSpy active tracking
 */
function initPostTOC() {
  const postWrapper = document.getElementById('post-layout-wrapper');
  const tocNav = document.getElementById('post-toc-nav');
  const mobileTocNav = document.getElementById('mobile-toc-nav');
  const postContent = document.querySelector('.post-content');
  const mobileTocDetails = document.getElementById('mobile-toc');

  if (!tocNav || !postContent || !postWrapper) {
    return;
  }

  // Find all H2 and H3 headings inside the post content
  const headings = Array.from(postContent.querySelectorAll('h2, h3'));

  // If there are fewer than 2 headings, hide the TOC rail and center the post
  if (headings.length < 2) {
    postWrapper.classList.add('no-toc');
    return;
  }

  // Helper function to generate safe slug ID if missing
  const usedIds = new Set();
  function getOrSetHeadingId(heading, index) {
    let id = heading.id;
    if (!id || id.trim() === '') {
      const text = heading.textContent.trim().toLowerCase();
      // Remove special characters, keep Chinese, alphanumeric, hyphen
      id = text
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
        .replace(/\s+/g, '-');
      if (!id) {
        id = 'heading-' + index;
      }
    }

    // Ensure unique ID in DOM
    let uniqueId = id;
    let counter = 1;
    while (usedIds.has(uniqueId) || (document.getElementById(uniqueId) && document.getElementById(uniqueId) !== heading)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);
    heading.id = uniqueId;
    return uniqueId;
  }

  // Build TOC items
  const tocFragment = document.createDocumentFragment();
  const mobileFragment = document.createDocumentFragment();
  let h2Count = 0;
  const headingData = [];

  headings.forEach((heading, index) => {
    const id = getOrSetHeadingId(heading, index);
    const tagName = heading.tagName.toLowerCase();
    const titleText = heading.textContent.trim();

    const isH2 = tagName === 'h2';
    if (isH2) {
      h2Count++;
    }

    const itemNumber = isH2 ? String(h2Count).padStart(2, '0') : null;

    // Create desktop TOC item
    const link = document.createElement('a');
    link.href = '#' + id;
    link.className = 'toc-item' + (isH2 ? ' toc-h2' : ' toc-h3 subsection');
    link.setAttribute('data-id', id);

    if (isH2 && itemNumber) {
      const numSpan = document.createElement('span');
      numSpan.className = 'rail-number';
      numSpan.setAttribute('aria-hidden', 'true');
      numSpan.textContent = itemNumber;
      link.appendChild(numSpan);
    }

    const titleSpan = document.createElement('span');
    titleSpan.className = 'rail-title';
    titleSpan.textContent = titleText;
    link.appendChild(titleSpan);

    tocFragment.appendChild(link);

    // Create mobile TOC item
    if (mobileTocNav) {
      const mobileLink = link.cloneNode(true);
      mobileFragment.appendChild(mobileLink);
    }

    headingData.push({
      id: id,
      element: heading,
      isH2: isH2
    });
  });

  tocNav.appendChild(tocFragment);
  if (mobileTocNav) {
    mobileTocNav.appendChild(mobileFragment);
  }

  // Smooth click scroll handler for all TOC links
  const allTocLinks = document.querySelectorAll('.toc-item');
  allTocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-id');
      const targetHeading = document.getElementById(targetId);

      if (targetHeading) {
        targetHeading.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, '', '#' + targetId);
        } else {
          location.hash = '#' + targetId;
        }

        // Close mobile TOC details if open
        if (mobileTocDetails && mobileTocDetails.open) {
          mobileTocDetails.open = false;
        }

        setActiveHeading(targetId);
      }
    });
  });

  // Back to top link
  const backToTopBtn = document.getElementById('toc-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (history.pushState) {
        history.pushState(null, '', window.location.pathname);
      }
      clearActiveHeadings();
    });
  }

  // Active state management
  function clearActiveHeadings() {
    allTocLinks.forEach(l => l.classList.remove('active'));
  }

  function setActiveHeading(activeId) {
    let firstActiveDesktopItem = null;

    allTocLinks.forEach(link => {
      const isTarget = link.getAttribute('data-id') === activeId;
      if (isTarget) {
        link.classList.add('active');
        if (!firstActiveDesktopItem && link.closest('#post-toc-rail')) {
          firstActiveDesktopItem = link;
        }
      } else {
        link.classList.remove('active');
      }
    });

    // Auto-scroll TOC container so the active item is always visible
    const tocRail = document.getElementById('post-toc-rail');
    if (firstActiveDesktopItem && tocRail) {
      const railRect = tocRail.getBoundingClientRect();
      const itemRect = firstActiveDesktopItem.getBoundingClientRect();

      if (itemRect.top < railRect.top || itemRect.bottom > railRect.bottom) {
        firstActiveDesktopItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }

  // ScrollSpy with requestAnimationFrame for silky smooth performance
  let ticking = false;
  const scrollOffset = 110; // Header height + buffer

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveHeadingOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateActiveHeadingOnScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If reached bottom of document, activate the last heading
    if (scrollY + windowHeight >= documentHeight - 40) {
      if (headingData.length > 0) {
        setActiveHeading(headingData[headingData.length - 1].id);
      }
      return;
    }

    // If near the very top before the first heading, clear active state
    if (headingData.length > 0 && headingData[0].element.getBoundingClientRect().top > scrollOffset + 50) {
      clearActiveHeadings();
      return;
    }

    // Find the heading currently in viewport
    let activeId = '';
    for (let i = 0; i < headingData.length; i++) {
      const rect = headingData[i].element.getBoundingClientRect();
      if (rect.top <= scrollOffset) {
        activeId = headingData[i].id;
      } else {
        break;
      }
    }

    if (activeId) {
      setActiveHeading(activeId);
    } else if (headingData.length > 0) {
      setActiveHeading(headingData[0].id);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial check on page load (in case URL contains a hash or page is reloaded mid-scroll)
  if (window.location.hash) {
    const initialTargetId = window.location.hash.substring(1);
    const initialHeading = document.getElementById(initialTargetId);
    if (initialHeading) {
      setTimeout(() => {
        initialHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveHeading(initialTargetId);
      }, 100);
    } else {
      updateActiveHeadingOnScroll();
    }
  } else {
    updateActiveHeadingOnScroll();
  }
}
