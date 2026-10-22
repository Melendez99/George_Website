<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title><xsl:value-of select="/rss/channel/title"/> (RSS feed)</title>
<style>
body{margin:0;background:#0a0f1c;color:#e8eefc;font:16px/1.6 system-ui,sans-serif}
main{max-width:720px;margin:0 auto;padding:48px 20px}
h1{font-size:28px;margin:0 0 8px}p{color:#9aa8c7}a{color:#38b6ff}
.box{border:1px solid #1f2a44;background:#0f1730;border-radius:14px;padding:16px 18px;margin:20px 0}
.item{border-top:1px solid #1f2a44;padding:18px 0}.item h2{font-size:19px;margin:0}.item small{color:#9aa8c7}
code{background:#16203d;padding:2px 6px;border-radius:6px;color:#e8eefc}
</style></head><body><main>
<h1><xsl:value-of select="/rss/channel/title"/></h1>
<p><xsl:value-of select="/rss/channel/description"/></p>
<div class="box"><strong>This is an RSS feed.</strong> Copy this page's address into a reader such as Feedly or Inoreader to get new posts automatically.<br/><a><xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>Visit the website</a></div>
<xsl:for-each select="/rss/channel/item">
<div class="item"><h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
<small><xsl:value-of select="substring(pubDate,1,16)"/></small><p><xsl:value-of select="description"/></p></div>
</xsl:for-each>
</main></body></html>
</xsl:template>
</xsl:stylesheet>
