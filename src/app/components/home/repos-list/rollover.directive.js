function rolloverDirective() {
  return {
    restrict: 'A',
    scope: {},
    link: (scope, element) => {
      const el = element[0];

      el.addEventListener('mousemove', handleMouseMove, { passive: true });
      el.addEventListener('mouseout', handleMouseOut, { passive: true });

      function handleMouseMove(event) {
        const tiltLimit = 5;
        const halfW = this.clientWidth / 2;
        const halfH = this.clientHeight / 2;

        // Calculate coordinates
        const xCoor = halfW - (event.pageX - this.offsetLeft);
        const yCoor = halfH - (event.pageY - this.offsetTop);

        // Calculate max rotation degree
        const xDeg = (yCoor / halfH) * tiltLimit + 'deg';
        const yDeg = (xCoor / halfW) * -tiltLimit + 'deg'; // Should be negative value

        const transformGen = function() {
          return (
            'perspective(160px) translate3d(0, -2px, 0) scale(1.1) rotateX(' +
            xDeg +
            ') rotateY(' +
            yDeg +
            ')'
          );
        };

        this.style.transform = transformGen();
      }

      function handleMouseOut() {
        this.removeAttribute('style');
      }
    },
  };
}

export default rolloverDirective;
