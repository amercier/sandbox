$(function() {

  var r = Raphael('<?= $container ?>', $('#<?= $container ?>').width());
<?php
    $diagram = new SimpleXMLElement($svg);

    $references = array(
        'gr0' => '320-#FFFFFF-#DDDDDD'
    );

    function getStyles($element, $references = array()) {
        $styles = array();
        $attributes = $element->attributes();
        foreach (explode(';', $attributes['style']) as $rule) {
            if (preg_match('/^ *(.*): (.*) *$/', $rule, $matches)) {
                $styles[$matches[1]] = $matches[2];
            }
        }
        foreach(array('fill', 'font-size') as $property) {
            if (isset($attributes->$property)) {

                if (preg_match('/^url\(#(.*)\)$/', trim($attributes[$property]), $matches)) {
                    $styles[$property] = $references[$matches[1]];
                }
                else {
                    $styles[$property] = trim($attributes[$property]);
                }
            }
        }
        return $styles;
    }

    function pointsToPath($points) {
        $path = '';
        foreach (explode(',', $points) as $index => $point) {
            if ($index % 2 === 0) {
                $path .= $index === 0 ? 'M' : 'L';
            }
            else {
                $path .= ' ';
            }
            $path .= $point;
        }
        return $path;
    }

    // Ellipse
    foreach ($diagram->g->ellipse as $ellipse) {
        $attributes = $ellipse->attributes();
        echo "  r.ellipse(" . $attributes['cx'] . ", " . $attributes['cy']
            . ", " . $attributes['rx'] . ", " . $attributes['ry'] . ").attr("
            . json_encode(getStyles($ellipse, $references)) . ");\n";
    }

    // Rectangle
    foreach ($diagram->g->rect as $rect) {
        $attributes = $rect->attributes();
        echo "  r.rect(" . $attributes['x'] . ", " . $attributes['y'] . ", "
            . $attributes['width'] . ", " . $attributes['height'] . ", "
            . $attributes['rx'] . ", " . $attributes['ry'] . ").attr("
            . json_encode(getStyles($rect, $references)) . ");\n";
    }

    // Lines
    foreach ($diagram->g->line as $line) {
        $attributes = $line->attributes();
        echo "  r.path('M" . $attributes['x1'] . " " . $attributes['y1']
            . "L" . $attributes['x2'] . " " . $attributes['y2'] . "').attr("
            . json_encode(getStyles($line, $references)) . ");\n";
    }

    // Polygons
    foreach ($diagram->g->polygon as $polygon) {
        $attributes = $polygon->attributes();
        echo "  r.path('" . pointsToPath($attributes->points) . "').attr("
            . json_encode(getStyles($polygon, $references)) . ");\n";
    }

    // Text
    foreach ($diagram->g->text as $text) {
        $attributes = $text->attributes();
        $styles = getStyles($text, $references);
        $styles['text-anchor'] = 'start';
        echo "  r.text(" . $attributes['x'] . ", " . ($attributes['y'] - 4)
            . ", '" . str_replace('\n', ' ', str_replace('\'', '\\\'', $text))
            . "').attr(" . json_encode($styles) . ");\n";
    }
?>
});
