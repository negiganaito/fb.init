/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import PHPQuerySerializer from "./PHPQuerySerializer";
import URIBase from "./URIBase";

const protocols = ["http", "https"];

const isUriNeedRawQuery = (url) => {
  if (url === null) return false;

  const parsedUrl =
    url instanceof URIBase ? url : URIBase.tryParse(url, PHPQuerySerializer);
  if (parsedUrl === null) return false;

  const protocol = parsedUrl.getProtocol();
  return !protocols.includes(protocol)
    ? false
    : isDomainNeedRawQuery(parsedUrl.getDomain());
};

const isDomainNeedRawQuery = (domain) => {
  return (
    domain !== null &&
    [
      "dms.netmng.com",
      "doubleclick.net",
      "r.msn.com",
      "watchit.sky.com",
      "graphite.instagram.com",
      "www.kfc.co.th",
      "learn.pantheon.io",
      "www.landmarkshops.in",
      "www.ncl.com",
      "s0.wp.com",
      "www.tatacliq.com",
      "bs.serving-sys.com",
      "kohls.com",
      "lazada.co.th",
      "xg4ken.com",
      "technopark.ru",
      "officedepot.com.mx",
      "bestbuy.com.mx",
      "booking.com",
      "nibio.no",
      "myworkdayjobs.com",
      "united-united.com",
      "gcc.gnu.org",
    ].some((configDomain) =>
      URIBase.isDomainSubdomainOfDomain(
        domain,
        configDomain,
        PHPQuerySerializer
      )
    )
  );
};

export { isDomainNeedRawQuery, isUriNeedRawQuery };
