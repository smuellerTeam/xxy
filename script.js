document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.interactive-unicorn').forEach((canvas) => {
    const type = canvas.classList.contains('overview-unicorn') ? 'overview' : 'welcome';
    new CanvasHorse(canvas, type);
  });
});

class CanvasHorse {
  constructor(canvas, type) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.type = type;
    this.direction = 1;
    this.lastTimestamp = 0;
    this.stateIndex = 0;
    this.stateTime = 0;
    this.phase = 0;
    this.canvas.tabIndex = 0;
    this.canvas.style.touchAction = 'manipulation';

    this.sequences = {
      overview: [
        { name: 'shake', duration: 1300 },
        { name: 'scrape1', duration: 700 },
        { name: 'scrape2', duration: 700 },
        { name: 'rear', duration: 1400 }
      ],
      welcome: [
        { name: 'gallop', duration: 2400 },
        { name: 'pose', duration: 1600 }
      ]
    };

    this.canvas.addEventListener('click', () => this.toggleDirection());
    this.canvas.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggleDirection();
      }
    });

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
    requestAnimationFrame((timestamp) => this.tick(timestamp));
  }

  toggleDirection() {
    this.direction *= -1;
    this.stateTime = 0;
    this.phase = 0;
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  tick(timestamp) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    const delta = Math.min(timestamp - this.lastTimestamp, 40);
    this.lastTimestamp = timestamp;
    this.stateTime += delta;
    this.phase += delta * 0.005;

    const sequence = this.sequences[this.type];
    const currentState = sequence[this.stateIndex];
    if (this.stateTime > currentState.duration) {
      this.stateTime -= currentState.duration;
      this.stateIndex = (this.stateIndex + 1) % sequence.length;
    }

    this.draw(sequence[this.stateIndex].name);
    requestAnimationFrame((next) => this.tick(next));
  }

  draw(action) {
    const ctx = this.ctx;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const base = { x: width * 0.55, y: height * 0.66 };
    const scale = Math.min(width, height) * (this.type === 'welcome' ? 0.24 : 0.22);
    const bodyTilt = this.direction * ((action === 'rear' ? -0.18 : Math.sin(this.phase * 1.8) * 0.04));
    const headAngle = (action === 'shake' ? Math.sin(this.phase * 14) * 0.18 : Math.sin(this.phase * 3.4) * 0.05) + this.direction * 0.06;
    const bodyY = base.y + (action === 'rear' ? -scale * 0.08 : 0);
    const aura = ctx.createRadialGradient(base.x, bodyY - scale * 0.12, scale * 0.4, base.x, bodyY - scale * 0.12, scale * 1.3);
    aura.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
    aura.addColorStop(1, 'rgba(139, 92, 255, 0.08)');

    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.ellipse(base.x, bodyY - scale * 0.1, scale * 1.35, scale * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();

    const step = action === 'gallop' ? 0.38 : 0.30;
    const offset = this.phase * 2.6;
    const legs = {
      frontLeft: Math.max(0, Math.sin(offset + Math.PI * 0.2)) * step,
      frontRight: Math.max(0, Math.sin(offset + Math.PI * 1.2)) * step,
      rearLeft: Math.max(0, Math.sin(offset + Math.PI * 0.6)) * step,
      rearRight: Math.max(0, Math.sin(offset + Math.PI * 1.6)) * step
    };

    if (action === 'scrape1') {
      legs.frontLeft += 0.35;
      legs.rearRight += 0.15;
    }
    if (action === 'scrape2') {
      legs.frontRight += 0.35;
      legs.rearLeft += 0.15;
    }
    if (action === 'rear') {
      legs.frontLeft += 0.25;
      legs.frontRight += 0.25;
      legs.rearLeft = 0.15;
      legs.rearRight = 0.15;
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.lineWidth = scale * 0.06;
    ctx.lineCap = 'round';

    this.drawBody(ctx, base.x, bodyY, scale, bodyTilt);
    this.drawTail(ctx, base.x, bodyY, scale, bodyTilt);
    this.drawLeg(ctx, base.x - scale * 0.36, bodyY + scale * 0.15, -0.12, legs.rearLeft, scale); // rear left
    this.drawLeg(ctx, base.x - scale * 0.06, bodyY + scale * 0.16, 0.08, legs.rearRight, scale); // rear right
    this.drawLeg(ctx, base.x + scale * 0.26, bodyY + scale * 0.12, 0.1, legs.frontLeft, scale); // front left
    this.drawLeg(ctx, base.x + scale * 0.55, bodyY + scale * 0.10, 0.16, legs.frontRight, scale); // front right
    this.drawNeckAndHead(ctx, base.x, bodyY, scale, headAngle, bodyTilt);
    this.drawMane(ctx, base.x, bodyY, scale, headAngle);
  }

  drawBody(ctx, x, y, scale, tilt) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt);
    const bodyGradient = ctx.createLinearGradient(-scale * 0.9, 0, scale * 1.1, 0);
    bodyGradient.addColorStop(0, '#f7f1ff');
    bodyGradient.addColorStop(0.5, '#ede2ff');
    bodyGradient.addColorStop(1, '#9c84ff');
    ctx.fillStyle = bodyGradient;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = scale * 0.07;
    ctx.beginPath();
    ctx.ellipse(0, 0, scale * 0.9, scale * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawTail(ctx, x, y, scale, tilt) {
    ctx.save();
    ctx.translate(x - scale * 0.85, y - scale * 0.05);
    ctx.rotate(-0.18 + tilt);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = scale * 0.08;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-scale * 0.16, -scale * 0.12, -scale * 0.38, -scale * 0.28, -scale * 0.68, -scale * 0.62);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-scale * 0.08, -scale * 0.05);
    ctx.bezierCurveTo(-scale * 0.28, -scale * 0.18, -scale * 0.48, -scale * 0.32, -scale * 0.56, -scale * 0.54);
    ctx.stroke();
    ctx.restore();
  }

  drawLeg(ctx, hipX, hipY, forward, lift, scale) {
    const kneeX = hipX + forward * scale * 0.92;
    const kneeY = hipY + scale * 0.32 - lift * scale * 0.26;
    const hoofX = hipX + forward * scale * 1.18;
    const hoofY = hipY + scale * 0.84 - lift * scale * 0.38;
    ctx.strokeStyle = 'rgba(31, 24, 60, 0.9)';
    ctx.lineWidth = scale * 0.08;
    ctx.beginPath();
    ctx.moveTo(hipX, hipY);
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(hoofX, hoofY);
    ctx.stroke();
    ctx.fillStyle = 'rgba(23, 17, 43, 0.9)';
    ctx.beginPath();
    ctx.ellipse(hoofX, hoofY, scale * 0.055, scale * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawNeckAndHead(ctx, x, y, scale, headAngle, bodyTilt) {
    ctx.save();
    ctx.translate(x + scale * 0.55, y - scale * 0.05);
    ctx.rotate(headAngle);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.lineWidth = scale * 0.06;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-scale * 0.22, -scale * 0.38, -scale * 0.7, -scale * 0.28);
    ctx.quadraticCurveTo(-scale * 0.78, -scale * 0.24, -scale * 0.9, -scale * 0.08);
    ctx.quadraticCurveTo(-scale * 0.76, -scale * 0.04, -scale * 0.52, scale * 0.1);
    ctx.lineTo(0, scale * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(-scale * 0.92, -scale * 0.11, scale * 0.18, scale * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(42, 34, 76, 0.9)';
    ctx.beginPath();
    ctx.ellipse(-scale * 0.95, -scale * 0.12, scale * 0.035, scale * 0.035, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-scale * 0.88, -scale * 0.18);
    ctx.lineTo(-scale * 0.96, -scale * 0.28);
    ctx.stroke();

    ctx.restore();
  }

  drawMane(ctx, x, y, scale, headAngle) {
    ctx.save();
    ctx.translate(x + scale * 0.16, y - scale * 0.22);
    ctx.rotate(headAngle * 0.12);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.lineWidth = scale * 0.08;
    ctx.lineCap = 'round';

    const hair = [
      { dx: 0, dy: 0 },
      { dx: -scale * 0.08, dy: -scale * 0.16 },
      { dx: -scale * 0.18, dy: -scale * 0.34 },
      { dx: -scale * 0.26, dy: -scale * 0.48 }
    ];

    hair.forEach((point, index) => {
      ctx.beginPath();
      ctx.moveTo(point.dx, point.dy);
      ctx.quadraticCurveTo(point.dx + scale * 0.08, point.dy - scale * 0.12, point.dx + scale * 0.12, point.dy - scale * 0.28);
      ctx.stroke();
    });
    ctx.restore();
  }
}
