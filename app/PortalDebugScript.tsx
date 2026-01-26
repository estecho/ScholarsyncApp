"use client";

import { useEffect } from "react";

export default function PortalDebugScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndHidePortal = () => {
      const portals = document.querySelectorAll("nextjs-portal");
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a1224acf-97f9-4b87-84be-b042fc2e5e36',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortalDebugScript.tsx:checkAndHidePortal',message:'Portal check start',data:{portalCount:portals.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion

      portals.forEach((portal, idx) => {
        const rectBefore = portal.getBoundingClientRect();
        const stylesBefore = window.getComputedStyle(portal);
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a1224acf-97f9-4b87-84be-b042fc2e5e36',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortalDebugScript.tsx:before-hide',message:'Portal before hide',data:{index:idx,hasCursorId:portal.hasAttribute('data-cursor-element-id'),isEmpty:portal.children.length===0&&(!portal.textContent||portal.textContent.trim().length===0),position:{top:rectBefore.top,left:rectBefore.left,width:rectBefore.width,height:rectBefore.height},display:stylesBefore.display,visibility:stylesBefore.visibility},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion

        // Force hide ALL portals unconditionally
        (portal as HTMLElement).style.cssText = `
          display: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          pointer-events: none !important;
          opacity: 0 !important;
        `;
        
        const rectAfter = portal.getBoundingClientRect();
        const stylesAfter = window.getComputedStyle(portal);
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a1224acf-97f9-4b87-84be-b042fc2e5e36',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortalDebugScript.tsx:after-hide',message:'Portal after hide',data:{index:idx,position:{top:rectAfter.top,left:rectAfter.left,width:rectAfter.width,height:rectAfter.height},display:stylesAfter.display,visibility:stylesAfter.visibility,opacity:stylesAfter.opacity},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
      });
    };

    // Check immediately
    checkAndHidePortal();

    // Watch for new portals using MutationObserver
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              ((node as Element).tagName === "NEXTJS-PORTAL" ||
                (node as Element).querySelector("nextjs-portal"))
            ) {
              shouldCheck = true;
            }
          });
        }
      });
      if (shouldCheck) {
        setTimeout(checkAndHidePortal, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also check periodically as a fallback
    const interval = setInterval(checkAndHidePortal, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}

