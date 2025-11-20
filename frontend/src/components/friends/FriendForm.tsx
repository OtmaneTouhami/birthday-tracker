import { useState, useEffect } from 'react';
import type { FriendRequest, FriendResponse } from '@/types/friend.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { formatDateForInput } from '@/utils/dateUtils';

interface FriendFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FriendRequest) => Promise<void>;
  friend?: FriendResponse | null;
}

export const FriendForm = ({ open, onClose, onSubmit, friend }: FriendFormProps) => {
  const [formData, setFormData] = useState<FriendRequest>({
    firstName: '',
    lastName: '',
    birthDate: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (friend) {
      setFormData({
        firstName: friend.firstName,
        lastName: friend.lastName,
        birthDate: formatDateForInput(friend.birthDate),
      });
    } else {
      setFormData({ firstName: '', lastName: '', birthDate: '' });
    }
  }, [friend, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{friend ? 'Edit Friend' : 'Add New Friend'}</DialogTitle>
          <DialogDescription>
            {friend
              ? 'Update your friend\'s information'
              : 'Add a friend to track their birthday'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : friend ? (
                'Update'
              ) : (
                'Add Friend'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
