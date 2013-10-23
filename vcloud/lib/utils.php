<?php

function getIdFromHref($href)
{
  return preg_replace('/^.*\/([^\/]+)$/', '$1', $href);
}

function getIdFromRef($ref)
{
  return getIdFromHref($ref->get_href());
}
