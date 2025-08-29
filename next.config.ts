import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export",
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        localPatterns: [
            {
                pathname: "/damage_types/**",
                search: "",
            },
            {
                pathname: "/warframe_portraits/**",
                search: "",
            },
        ],
        unoptimized: true,
        domains: ["wiki.warframe.com", "framedle.org"],
    },
};

export default nextConfig;
