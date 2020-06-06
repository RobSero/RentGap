def value_change(previous, current):
  if previous == current:
    return 0
  try:
    return ((current-previous) / previous) * 100
  except ZeroDivisionError:
    return 0