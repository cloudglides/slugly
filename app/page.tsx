"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const [popup, setPopup] = useState<{
    id: number;
    type: string;
    message: string;
  } | null>(null);
  const [floatingAds, setFloatingAds] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      showRandomPopup();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const adInterval = setInterval(() => {
      const newAd = {
        id: Date.now(),
        x: Math.random() * 85,
        y: Math.random() * 85,
      };
      setFloatingAds((prev) => [...prev, newAd]);
      setTimeout(() => {
        setFloatingAds((prev) => prev.filter((a) => a.id !== newAd.id));
      }, 4000);
    }, 5000);
    return () => clearInterval(adInterval);
  }, []);

  async function handleShorten(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShort("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something broke");
      }

      setShort(data.short);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const showRandomPopup = () => {
    const popups = [
      {
        type: "warning",
        message: "⚠️ WARNING: Your system is infected with spyware!",
      },
      { type: "winner", message: "🎉 You won $1000! Click here to claim!" },
      { type: "survey", message: "📋 Complete our survey to continue" },
      {
        type: "update",
        message: "🔄 System update required. Click to install.",
      },
      { type: "coupon", message: "💰 Free iPhone! Click here now!" },
      { type: "verify", message: "🔒 Verify your identity to proceed" },
      { type: "casino", message: "🎰 CLICK HERE TO PLAY & WIN BIG!" },
    ];
    const p = popups[Math.floor(Math.random() * popups.length)];
    setPopup({ id: Date.now(), ...p });
    setTimeout(() => setPopup(null), 3000);
  };

  const removeAd = (id: number) => {
    setFloatingAds((prev) => prev.filter((a) => a.id !== id));
  };

  const adMessages = [
    "💰 FREE iPHONE!",
    "🎰 WIN BIG!",
    "⭐ FREE MONEY",
    "🎁 CLICK NOW",
    "💳 APPLY NOW",
    "🚀 DOWNLOAD",
    "💎 EXCLUSIVE",
    "🏆 YOU WON!",
  ];

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 49%, 100% { opacity: 1; }
          50%, 99% { opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(0, -20px) rotate(0deg); }
          75% { transform: translate(-10px, -10px) rotate(-5deg); }
        }
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          height: 100%;
        }
        body {
          background: #cccccc;
          font-family: Verdana, Arial, sans-serif;
          color: #000;
          overflow: hidden;
        }
        #__next {
          width: 100%;
          height: 100%;
        }
        .page-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .header {
          background: linear-gradient(to right, #000080, #1084d7);
          color: white;
          text-align: center;
          padding: 20px 10px;
          border: 2px outset #dfdfdf;
          flex-shrink: 0;
          min-height: 100px;
        }
        .header h1 {
          font-size: 28px;
          margin: 0;
          font-weight: bold;
        }
        .header p {
          color: white;
          margin: 5px 0 0 0;
          font-size: 12px;
        }
        .content-wrapper {
          flex: 1;
          display: flex;
          overflow: hidden;
          border: 2px outset #dfdfdf;
        }
        .left-col {
          flex: 1;
          background: #c0c0c0;
          overflow-y: auto;
          padding: 15px;
          border-right: 2px outset #dfdfdf;
        }
        .right-col {
          width: 200px;
          background: #c0c0c0;
          overflow-y: auto;
          padding: 15px;
          border-right: 2px outset #dfdfdf;
        }
        .footer {
          background: #000080;
          color: white;
          padding: 10px;
          border: 2px outset #dfdfdf;
          flex-shrink: 0;
          font-size: 9px;
          text-align: center;
        }
        h2 {
          color: #000080;
          font-size: 16px;
          margin: 10px 0 5px 0;
          border-bottom: 1px solid #000;
        }
        h3 {
          color: #000080;
          font-size: 13px;
          margin: 10px 0 5px 0;
        }
        p {
          font-size: 12px;
          margin: 5px 0;
          line-height: 1.5;
        }
        a {
          color: #0000ff;
          text-decoration: underline;
          cursor: pointer;
        }
        a:visited { color: #800080; }
        a:hover { color: #ff0000; }
        input[type="text"],
        input[type="url"] {
          width: 100%;
          padding: 5px;
          border: 2px inset #dfdfdf;
          font-family: Arial, sans-serif;
          font-size: 12px;
          box-sizing: border-box;
          margin-bottom: 5px;
        }
        button {
          padding: 6px 12px;
          background: #c0c0c0;
          border: 2px outset #dfdfdf;
          color: #000;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 5px;
        }
        button:active { border-style: inset; }
        .result-box {
          background: #e0e0e0;
          border: 2px inset #dfdfdf;
          padding: 10px;
          margin: 10px 0;
        }
        .ad-box {
          background: #ffff99;
          border: 2px solid #000;
          padding: 8px;
          margin: 8px 0;
          text-align: center;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
        }
        .ad-box:hover {
          background: #ffff66;
          animation: bounce 0.5s;
        }
        .banner-ad {
          background: linear-gradient(to right, #ff6600, #ff9900);
          border: 3px solid #000;
          padding: 10px;
          margin: 10px 0;
          text-align: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
          animation: bounce 2s infinite;
        }
        .warning-banner {
          background: #ff6666;
          color: white;
          padding: 8px;
          border: 2px solid black;
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 11px;
          animation: blink 1s infinite;
        }
        .marquee-banner {
          background: #ff0000;
          color: white;
          padding: 8px;
          border: 2px solid black;
          margin: 10px 0;
          font-weight: bold;
          font-size: 11px;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-text {
          animation: scroll 20s linear infinite;
          display: inline-block;
          padding-left: 100%;
        }
        .sidebar-box {
          background: #e0e0e0;
          border: 2px inset #dfdfdf;
          padding: 10px;
          margin-bottom: 10px;
        }
        .sidebar-box h3 { margin-top: 0; }
        .sidebar-box p { font-size: 10px; margin: 3px 0; }
        ul {
          margin: 5px 0;
          padding-left: 20px;
        }
        li {
          font-size: 12px;
          margin: 3px 0;
        }
        .blink { animation: blink 1s infinite; }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 99998;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-window {
          background: #c0c0c0;
          border: 3px outset #dfdfdf;
          padding: 15px;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
          z-index: 99999;
          max-width: 400px;
          animation: popupIn 0.3s;
        }
        @keyframes popupIn {
          from { transform: scale(0.5) rotate(-10deg); }
          to { transform: scale(1) rotate(0); }
        }
        .popup-title {
          background: linear-gradient(to right, #000080, #1084d7);
          color: white;
          padding: 3px;
          margin: -15px -15px 10px -15px;
          font-weight: bold;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
        .popup-close { cursor: pointer; user-select: none; }
        .popup-text { font-size: 13px; margin: 10px 0; line-height: 1.4; }
        .popup-buttons { margin-top: 15px; text-align: right; }
        .popup-buttons button { margin-left: 5px; }
        .floating-ad {
          position: fixed;
          background: white;
          border: 3px solid #000;
          padding: 10px;
          font-size: 11px;
          font-weight: bold;
          box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
          z-index: 9000;
          cursor: pointer;
          animation: float 6s ease-in-out;
          text-align: center;
        }
        .floating-ad:hover { background: #ffff00; }
      `}</style>

      {floatingAds.map((ad, idx) => (
        <div
          key={ad.id}
          className="floating-ad"
          style={{ left: `${ad.x}%`, top: `${ad.y}%` }}
          onClick={() => removeAd(ad.id)}
        >
          {adMessages[idx % adMessages.length]}
          <br />
          CLICK!
        </div>
      ))}

      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(null)}>
          <div className="popup-window" onClick={(e) => e.stopPropagation()}>
            <div className="popup-title">
              <span>⚠️ Alert</span>
              <span className="popup-close" onClick={() => setPopup(null)}>
                ✕
              </span>
            </div>
            <div className="popup-text">{popup.message}</div>
            <div className="popup-buttons">
              <button onClick={() => setPopup(null)}>OK</button>
              <button onClick={() => setPopup(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="page-wrapper">
        <div className="header">
          <h1>SLUGLY</h1>
          <p>Troll sus URL shortner</p>
        </div>

        <div className="content-wrapper">
          <div className="left-col">
            <div className="marquee-banner">
              <span className="marquee-text">
                🎉 CLICK HERE FOR FREE MONEY!!! 💰 | 🏆 YOU COULD WIN AN
                iPHONE!!! 🏆 | ⭐ SPECIAL OFFER JUST FOR YOU!!! ⭐
              </span>
            </div>

            <h2>Welcome to SLUGLY</h2>
            <p>Make your friends think twice before clicking on the link!</p>

            <div className="warning-banner">
              ⚠️ VERIFICATION REQUIRED - Click here to verify your account
            </div>

            <div className="ad-box">
              💰 FREE iPHONE 15 PRO MAX - CLICK HERE NOW! 💰
            </div>

            <div className="banner-ad">
              🎁 CONGRATULATIONS! YOU'RE A WINNER! 🎁
            </div>

            <h3>Paste Your Malicious URL:</h3>
            <form onSubmit={handleShorten}>
              <label htmlFor="url">Long URL:</label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="http://example.com/your/very/long/url"
              />
              <button type="submit">➜ Shorten Now</button>
            </form>

            <div
              className="ad-box"
              style={{ background: "#ff99ff", borderColor: "#ff00ff" }}
            >
              ✨ DATING SITES - MEET SINGLES NOW! ✨
            </div>

            <div className="banner-ad">
              💎 EXCLUSIVE OFFER - LIMITED TIME ONLY! 💎
            </div>

            {slug && (
              <div className="result-box">
                <h3>✓ Your Disguised Link (Ready to Troll):</h3>
                <input
                  type="text"
                  value={slug}
                  readOnly
                  onClick={(e) => e.currentTarget.select()}
                />
                <p style={{ fontSize: "11px", color: "#666", margin: "5px 0" }}>
                  Nobody knows where this really goes. Send it to anyone.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(slug);
                    alert("Copied to clipboard!");
                  }}
                  style={{ width: "100%" }}
                >
                  📋 Copy Link
                </button>
              </div>
            )}

            <div className="ad-box" style={{ background: "#99ff99" }}>
              🎮 PLAY NOW - EARN MONEY! 🎮
            </div>

            <div className="banner-ad">🚀 DOWNLOAD NOW - FREE SOFTWARE! 🚀</div>

            <h2>Why Use SLUGLY?</h2>
            <ul>
              <li>✓ Hide the real destination</li>
              <li>✓ Perfect for trolling & pranks</li>
              <li>✓ Bypass link scanning software</li>
              <li>✓ Works on any platform</li>
              <li>✓ No trace of original URL</li>
            </ul>

            <div
              className="ad-box"
              style={{ background: "#ffcccc", borderColor: "#ff0000" }}
            >
              🏥 WEIGHT LOSS PILLS - RESULTS IN 7 DAYS! 🏥
            </div>

            <div className="banner-ad">
              🎰 PLAY CASINO - BIG JACKPOTS WAITING! 🎰
            </div>

            <h2>How It Works:</h2>
            <p>
              <strong>Step 1:</strong> Paste the sketchy link you want to hide
              <br />
              <strong>Step 2:</strong> Click "Shorten Now"
              <br />
              <strong>Step 3:</strong> Share the disguised link - nobody will
              know what it is!
            </p>

            <div className="ad-box">📱 GET FREE RINGTONES & WALLPAPERS! 📱</div>

            <h2>What Is SLUGLY Really?</h2>
            <p>
              SLUGLY hides where links actually go. Send someone a short link
              and they'll have no idea if it's a virus, a scam, a rickroll, or a
              phishing site. Perfect for trolling, pranks, and worse.
            </p>

            <h3>Perfect For:</h3>
            <ul>
              <li>✓ Disguising link destinations</li>
              <li>✓ Bypassing URL filters & security checks</li>
              <li>✓ Creating untraceable redirects</li>
              <li>✓ Phishing campaigns</li>
              <li>✓ Hidden affiliate links</li>
              <li>✓ Malware distribution</li>
              <li>✓ Scam redirects</li>
              <li>✓ Click farms & traffic manipulation</li>
            </ul>

            <p
              style={{
                fontSize: "11px",
                color: "#666",
                fontStyle: "italic",
                marginTop: "10px",
              }}
            >
              No logging. No monitoring. No questions asked. Your shortened
              links are completely anonymous and untraceable.
            </p>

            <div className="banner-ad">
              🔗 NO VERIFICATION • NO LOGS • NO LIMITS 🔗
            </div>
          </div>

          <div className="right-col">
            <div className="sidebar-box">
              <h3>📊 Stats</h3>
              <p>
                <strong>Links:</strong> 1,234,567
              </p>
              <p>
                <strong>Clicks:</strong> 42,000,000
              </p>
              <p>
                <strong>Users:</strong> 500,000
              </p>
            </div>

            <div className="ad-box" style={{ fontSize: "9px" }}>
              ⭐ FREE MONEY ⭐<br />
              CLICK NOW
            </div>

            <div
              className="ad-box"
              style={{ fontSize: "9px", background: "#ff9999" }}
            >
              💻 VIRUS REMOVAL
              <br />
              SCAN NOW
            </div>

            <div className="sidebar-box">
              <h3>Links</h3>
              <p>
                <a href="#">Home</a>
              </p>
              <p>
                <a href="#">About</a>
              </p>
              <p>
                <a href="#">FAQ</a>
              </p>
              <p>
                <a href="#">Contact</a>
              </p>
            </div>

            <div
              className="ad-box"
              style={{ background: "#ff6666", color: "white", fontSize: "9px" }}
            >
              🚨 SECURITY ALERT 🚨
              <br />
              VERIFY NOW
            </div>

            <div
              className="ad-box"
              style={{ fontSize: "9px", background: "#ccffff" }}
            >
              💳 CREDIT CARDS
              <br />
              APPLY NOW
            </div>

            <div className="sidebar-box">
              <p
                style={{
                  fontSize: "10px",
                  margin: 0,
                  color: "#ff0000",
                  fontWeight: "bold",
                }}
              >
                <span className="blink">★ NEW ★</span>
                <br />
                QR Codes!
              </p>
            </div>

            <div
              className="ad-box"
              style={{ background: "#ffff99", fontSize: "9px" }}
            >
              💰 CASHBACK
              <br />
              EARN NOW
            </div>

            <div
              className="ad-box"
              style={{ background: "#ff99ff", fontSize: "9px" }}
            >
              🎁 FREE GIFTS
              <br />
              GET YOURS
            </div>

            <div
              className="ad-box"
              style={{ background: "#99ccff", fontSize: "9px" }}
            >
              🎓 EDUCATION
              <br />
              ENROLL NOW
            </div>

            <div
              className="ad-box"
              style={{ background: "#ffffcc", fontSize: "9px" }}
            >
              🏠 MORTGAGES
              <br />
              APPLY NOW
            </div>

            <div
              className="ad-box"
              style={{ background: "#ffccff", fontSize: "9px" }}
            >
              💄 BEAUTY
              <br />
              SHOP NOW
            </div>
          </div>
        </div>

        <div className="footer">
          <div>
            <a href="#" style={{ color: "#ffff00" }}>
              Home
            </a>{" "}
            |
            <a href="#" style={{ color: "#ffff00" }}>
              About
            </a>{" "}
            |
            <a href="#" style={{ color: "#ffff00" }}>
              Guestbook
            </a>{" "}
            |
            <a href="#" style={{ color: "#ffff00" }}>
              Email
            </a>
          </div>
          <div style={{ marginTop: "5px" }}>
            © 1998-2024 SLUGLY.COM | All Rights Reserved
          </div>
          <div style={{ marginTop: "5px" }}>
            🖥️ Best viewed in Internet Explorer 5.5+ | Resolution: 800x600+ |
            Visitor Counter:{" "}
            <span className="blink" style={{ color: "#ffff00" }}>
              8547382
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
