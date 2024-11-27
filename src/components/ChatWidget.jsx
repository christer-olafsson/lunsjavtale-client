import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.weply.chat/widget/df19a2d562769647935a1e0951897c3a";
    script.async = true;
    script.onload = () => console.log("Chat widget loaded successfully");
    script.onerror = () => console.error("Failed to load chat widget");
    document.body.appendChild(script);

    return () => {
      // Cleanup to prevent duplicate script loading
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI element required for the widget
};

export default ChatWidget;
