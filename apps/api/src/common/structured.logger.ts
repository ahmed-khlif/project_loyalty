import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class StructuredLogger implements LoggerService {
  private write(level: string, message: unknown, context?: string) {
    process.stdout.write(`${JSON.stringify({ level, message, context, timestamp: new Date().toISOString() })}\n`);
  }

  log(message: unknown, context?: string) { this.write("info", message, context); }
  error(message: unknown, trace?: string, context?: string) { this.write("error", { message, trace }, context); }
  warn(message: unknown, context?: string) { this.write("warn", message, context); }
  debug(message: unknown, context?: string) { this.write("debug", message, context); }
  verbose(message: unknown, context?: string) { this.write("trace", message, context); }
}
