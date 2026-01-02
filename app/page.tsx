"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setShort("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error generating link");
      }

      setShort(data.short);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="announcement">
        *** SLUGLY.COM - URLs for Troll Purpose, Sussy Links Only! ***
      </div>

      <div className="window-box">
        <div className="window-titlebar">
          <span>[*] Welcome to SLUGLY.COM</span>
          <div className="window-buttons">
            <div className="window-btn">_</div>
            <div className="window-btn">☐</div>
            <div className="window-btn">✕</div>
          </div>
        </div>

        <div className="window-content">
          <div className="icon-grid">
            <div className="icon-item">
              <div className="icon">[L]</div>
              <div className="icon-label">Shorten URL</div>
            </div>
            <div className="icon-item">
              <div className="icon">[?]</div>
              <div className="icon-label">FAQ</div>
            </div>
            <div className="icon-item">
              <div className="icon">[@]</div>
              <div className="yellow-new">NEW!</div>
              <div className="icon-label">Contact Us</div>
            </div>
            <div className="icon-item">
              <div className="icon">[B]</div>
              <div className="icon-label">Guestbook</div>
            </div>
            <div className="icon-item">
              <div className="icon">[D]</div>
              <div className="icon-label">Download</div>
            </div>
            <div className="icon-item">
              <div className="icon">[F]</div>
              <div className="icon-label">Search</div>
            </div>
            <div className="icon-item">
              <div className="icon">[W]</div>
              <div className="icon-label">Links</div>
            </div>
            <div className="icon-item">
              <div className="icon">[C]</div>
              <div className="icon-label">Settings</div>
            </div>
          </div>

          <div className="tagline">
            SLUGLY Information, Link Shortening, and Internet Tools on the Net!
          </div>

          <hr />

          <div className="nav-row">
            <a href="#">Home</a> |<a href="#">About</a> |
            <a href="#">Advertise</a> |<a href="#">Shareware</a> |
            <a href="#">Search</a> |<a href="#">E-mail</a>
          </div>

          <div className="nav-row">
            <a href="#">Startup/Usability</a> |<a href="#">Connectivity</a> |
            <a href="#">Internet Hyper-Glossary</a> |
            <a href="#">Shareware CD-ROM</a>
          </div>

          <div className="ad-row">
            <div className="ad-small">
              [~] WebTrends
              <br />
              Essential Reporting
            </div>
            <div className="ad-small">
              [X] FREE 32-bit
              <br />
              Remote Software
            </div>
          </div>

          <div className="window-statusbar">
            <span>©1996 SLUGLY.COM</span>
            <span>|</span>
            <span>Webmaster Services by Steve Jenkins</span>
          </div>
        </div>
      </div>

      <br />

      <div className="warning-loud">
        !!! WARNING !!!
        <br />
        This URL is for troll purpose. Sussy URLs ahead.
      </div>
      <center>
        <h1
          style={{ fontSize: "42px", color: "#000080", margin: "15px 0 5px 0" }}
        >
          SLUGLY.COM
        </h1>
        <p style={{ fontSize: "12px", color: "#555", marginBottom: "15px" }}>
          <font face="Verdana">
            The Fastest Way to Shorten Links on the Web
          </font>
        </p>
      </center>

      <div className="form-box">
        <p style={{ fontSize: "11px", marginBottom: "8px" }}>
          <font face="Verdana">
            Enter the full URL below including http:// and we will instantly
            create a shorter version:
          </font>
        </p>
        <form onSubmit={handleGenerate}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            URL to Shorten:
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://www.example.com/very/long/url"
            disabled={loading}
          />
          <br />
          <input
            type="submit"
            value={loading ? "SHORTENING..." : "SHORTEN MY URL"}
            disabled={loading}
          />
        </form>
      </div>

      {error && <div className="error-box">ERROR: {error}</div>}

      {short && (
        <div className="result-box">
          <h3 style={{ color: "#009900", margin: "0 0 8px 0" }}>
            [OK] Your Link Has Been Shortened!
          </h3>
          <p style={{ fontSize: "10px", margin: "0 0 8px 0" }}>
            Copy this link:
          </p>
          <div className="result-code">{short}</div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(short);
              alert("Link copied!");
            }}
            style={{
              padding: "4px 12px",
              fontFamily: "Verdana",
              fontSize: "11px",
              marginTop: "8px",
            }}
          >
            Copy Link
          </button>
        </div>
      )}

      <div className="ad-row">
        <div className="ad-small">
          [A] x-art
          <br />
          world gallery
        </div>
      </div>

      <div className="badges">
        <div className="badge">Internet Explorer</div>
        <div className="badge">Windows 95</div>
        <div className="badge">Virtual Servers</div>
      </div>
      <div className="footer">
        <div style={{ marginBottom: "10px" }}>
          <b>Visitors Since 1999:</b>
          <br />
          <span style={{ fontFamily: "monospace" }}>
            [ 0 ][ 0 ][ 0 ][ 4 ][ 2 ][ 6 ][ 9 ]
          </span>
        </div>
        <hr style={{ margin: "8px 0" }} />
        <div>
          © 1996-2004 SLUGLY.COM™ All Rights Reserved
          <br />
          Best viewed in Internet Explorer 5.5 or higher
          <br />
          Screen resolution: 1024x768 recommended
          <br />
          <br />
          <a href="mailto:webmaster@slugly.com">Webmaster</a> |
          <a href="#">Privacy Policy</a> |<a href="#">Terms</a>
          <br />
          <br />
          <span style={{ fontSize: "8px", color: "#777" }}>
            SLUGLY is not affiliated with Microsoft, AOL, or any government
            agency. All trademarks are property of their respective owners.
          </span>
        </div>
      </div>

      <div style={{ height: "30px" }}></div>
    </>
  );
}
