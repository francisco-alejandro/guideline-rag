import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';

export const SupabaseProvider = {
  provide: SupabaseClient,
  useFactory: (configService: ConfigService) => {
    return new SupabaseClient(
      configService.get('SUPABASE_URL') as string,
      configService.get('SUPABASE_KEY') as string,
    );
  },
  inject: [ConfigService],
};
