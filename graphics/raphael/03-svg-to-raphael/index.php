<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Sandbox / Graphics / Raphaël / 02 - SVG to Raphael</title>
    <link rel="stylesheet" href="../../../lib/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="../../../lib/bootstrap/dist/css/bootstrap-theme.css" />
    <link rel="stylesheet" href="../../../sandbox.css" />
  </head>
  <body>
    <div class="container-sandbox">

      <!-- Header
      ================================================================ -->
      <header>
        <div class="jumbotron">
          <h1>SVG to Raphael</h1>
        </div>
      </header>

      <!-- Breadcrumbs
      ================================================================ -->
      <ul class="breadcrumb">
        <li>
          <a href="../../..">Sandbox</a>
        </li>
        <li>
          <a href="../..">Graphics</a>
        </li>
        <li>
          <a href="..">Raphaël</a>
        </li>
        <li class="active">03 - SVG to Raphael</li>
      </ul>

      <!-- Content
      ================================================================ -->
      <h3>Result</h3>
      <div>
        <div id="synoptics-container"></div>
      </div>

      <!-- Source
      ================================================================ -->
      <h3>Source</h3>
      <div>
        <?
            $svg = file_get_contents(__DIR__ . '/activity.svg');
            echo $svg;
        ?>

        <pre><?
            $xmlDoc = new DOMDocument();
            $xmlDoc->loadXML($svg);
            $xmlDoc->formatOutput = true;
            echo htmlentities($xmlDoc->saveXML());
        ?></pre>
      </div>

    </div>
  </body>
  <script src="../../../lib/jquery/jquery.js"></script>
  <script src="../../../lib/raphael/raphael.js"></script>
  <script><?
    $container = 'synoptics-container';
    include 'activity-to-raphael.php';
  ?></script>
</html>
