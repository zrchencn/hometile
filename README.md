# Hometile(for now)
## Utilities
- packages
    - getting npm working would be good, ask TA for help
    - copy the file to vendor folder for now
    - use CDN for deployment if above not working
- deploy
    - get know how to deploy on Heroku for express app

## Thoughts
### lights
- window as RectAreaLight => Strip lighting or bright windows
    - so open windows at wall at different position can shift the light
- a PointLight => Light Bulbs as initial lighting
    - can be turn off
- optional ambient light for developing purpose

### scenes
- three surface prependicular mimic a room
- cubes as tiles to simulate room structure
- for two shapes:
    - use cube for room structure
    - use sphere for furniture
- on decoration
    - hide cubes and spheres
    - display furniture

### interactive
- raycasting for picking correct tiles in a grid
- set up grid for 8 8 8 for development use
    - let user enter the size later
