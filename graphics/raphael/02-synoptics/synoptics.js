$(function() {

  var r = Raphael('synoptics-container', $('#synoptics-container').width(), 600);
  var rectAttrs = {
    stroke: '#000000',
    'stroke-width': 1.5,
    fill:'340-#F6F6F6-#DDDDDD'
  };
  var rectGlow = {
    color:'#999999',
    fill: '#999999',
    offsetx: 3,
    offsety: 5
  };
  var textAttrs = {
    'font-size': '12',
    'text-anchor': 'start'
  };
  var lineAttrs = {
    'stroke-width': 1.5
  };
  var arrowAttrs = {
    'stroke-width': 1.0,
    fill: '#000000'
  };
  var textOffsetY = -5;

  r.ellipse(183, 20, 10, 10).attr({ fill: '#000000', stroke: 'none' });

  r.rect(112, 94, 142, 33.9629, 12.5).attr(rectAttrs);//.glow(rectGlow);
  r.text(122, 116 + textOffsetY, 'Snapshot th vSM VM').attr(textAttrs);

  r.path('M183 127.9629L183 148.4814').attr(lineAttrs);
  r.path('M179 138.4814L183 148.4814L187 138.4814L183 142.4814').attr(arrowAttrs);
  //r.path('M179.5 138.4814L183.5 148.4814L187.5 138.4814L183.5 142.4814').attr(arrowAttrs);


  r.rect(44.5, 148.4814, 277, 47.9258, 12.5).attr(rectAttrs);//.glow(rectGlow);
  r.text(54.5, 170.4814 + textOffsetY, 'Upgrade the vSM').attr(textAttrs);
  r.text(66.5, 184.4443 + textOffsetY, 'FE_CCI_026_Upgrade_to_vSM_5.1.2c.pdf').attr(textAttrs).attr({ href: './FE_CCI_026_Upgrade_to_vSM_5.1.2c.pdf' });

});
