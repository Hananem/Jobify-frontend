import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="px-[2%] md:px-[6%] mt-20 z-0">
      <footer>
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Home</h2>
            <ul>
              <li className="my-3 text-muted">
                <Link to="/">Home</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/community">Community</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/events">Events</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem] text-sm">
            <h2 className="text-xl font-semibold">Resources</h2>
            <ul>
              <li className="my-3 text-muted">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/guides">Guides</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/help">Help center</Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem] text-sm">
            <h2 className="text-xl font-semibold">Main Links</h2>
            <ul>
              <li className="my-3 text-muted">
                <Link to="/talent">Talent</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/events">Events</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/history">History</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/schedule">Schedule</Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem] text-sm text-center">
            <h2 className="text-xl font-semibold">
              Subscribe to our Newsletter
            </h2>
            <p className="text-muted text-13">
              Subscribe to be the first one to know about updates. Enter your
              email
            </p>
            <div className="flex-align-center justify-center my-3">
              <input
                type="text"
                className="px-4 py-[0.35rem] card dark:shadow-none outline-none"
                placeholder="Email Address.."
              />
              <button className="btn btn-primary -ml-2">subscribe</button>
            </div>
            <div className="flex-center-center gap-5 my-6">
              <Link to="#">
                <FiFacebook />
              </Link>
              <Link to="#">
                <FaTwitter />
              </Link>
              <Link to="#">
                <FaInstagram />
              </Link>
              <Link to="#">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <section className="attribution pt-2 border-top-light">
        <Link to="/" className="logo flex-center-center gap-1 my-3">
          <img src="/logo.png" alt="" className="w-20" />
        </Link>
        <p className="text-center text-muted pb-2">
          Created By <span className="text-primary">Hana Nemsi</span> | All
          Rights Reserved
        </p>
      </section>
    </div>
  );
};

export default Footer;
